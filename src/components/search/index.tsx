import React, { useState, useEffect, useRef } from 'react';
import { _Prices, _PriceSingleDataPoint } from '../../models';
import TickerCard from './tickerCard';
import styled from '@emotion/styled'
import Star from './star';

const SearchContainer = styled.div`
    flex: 1 0 auto;
    @media(max-width: 375px) {
        margin-top: 20px;
    }
`

const RowContainer = styled.div`
    position: relative;
    font-size: 40px;
    border-bottom: 1px solid #608fd1;;
    display: flex;
    @media(max-width: 650px) {
        font-size: 30px;
    };
    @media(max-width: 500px) {
        flex-direction: column;
        border-bottom: none;
    };
`

const Input = styled.input`
    background-color: rgba(0,0,0,0);
    color: rgba(255, 255, 255, 0);
    font-size: 40px;
    outline: none;
    border: none;
    // flex: 1 0 0;
    max-width: 100%;
    width: 100%;
    margin-bottom: 10px;
    font-weight: 300;
    z-index: 2;
    @media(max-width: 375px) {
        height: 30px;
        font-size: 25px;
    };
    &:focus {
        color: #fff;
    };
    &:focus + label {
        display: none;
    };
`

const OverlayQuery = styled.div`
    color: white;
`

const OverlayName = styled.div`
    color: white;
    font-weight: 300;
    margin-right: 15px;
    @media(max-width: 600px) {

    }
`

const OverlaySymbol = styled.div`
    color: #beccdc;
    opacity: 0.5;
    font-weight: 300;
    @media(max-width: 750px) {
        opacity: 0;
    }
    @media(max-width: 500px) {
        opacity: 1;
    }
`

const Tgroup = styled.div`
    display: flex;
    font-size: 20px;
`

const NameExchange = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media(min-width: 375px) {
        display: none
    };
`

const PriceGroup = styled.div`
    display: flex;
    flex: 1 0 0;
    align-items: center;
    position: relative;
    @media(max-width: 375px) {
        background-color: rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        margin-bottom: 20px;
    }
`

const SubSearch = styled.div`
    display: flex;
    margin-top: 15px;
    @media(max-width: 375px) {
        display: none;
    }
`

const SubInput = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 60%;
`

const Sub = styled.span`
    background-color: #415f8a;
    border-radius: 2px;
    height: 24px;
    margin-left: 2%;
    padding: 1%;
    @media(max-width: 500px) {
        display: none;
    }
`

const Sub1 = styled.span`
    background-color: #415f8a;
    border-radius: 2px;
    height: 24px;
    margin-left: 2%;
    padding: 1%;
    @media(max-width: 375px) {
        font-size: 12px;
        height: 100%;
    }
`

const DateOpen = styled.div`
    font-size: 15px;
    display: flex;
    flex: 1 0 40%;
    font-weight: 300;
    justify-content: flex-end;
    margin-left: 5px;
`

const Time = styled.span`
    color: #608fd1;
    @media(max-width: 750px) {
        display: none;
    }
`

const MarketStatus = styled.span`
    font-size: 15px;
    font-weight: 400;
    display: flex;
    margin-left: 30px;
    position: relative;
`

const MarketIcon = styled.div(props => ({
    color: props.color ? 'yellow' : 'gray',
    fontSize: '15px',
    position: 'absolute',
    top: '-2px',
    left: '-20px',
}))

const StockList = styled.div`
    position: absolute;
    height: 100%;
    width: 95%;
    margin: 0 2.5% 0 2.5%;
    bottom: -100%;
    left: 0;
    z-index: 1;
    outline: none;
    @media(max-width: 500px) {
        bottom: -50px;
    };
    @media(max-width: 375px) {
        bottom: -27%;
    };
`

const Stock = styled.div`
    background-color: rgba(0,24,57,0.9);
    color: #608fd1;
    cursor: pointer;
    &:hover {
        background-color: #0042a0;
    }
`

const SubError = styled.div`
    display: flex;
    margin-top: 15px;
    opacity: 0;
`

const StockError = styled.div`
    background-color: rgba(0,24,57,0.9);
    color: #c72820;
`

const SearchIcon = styled.div`
    height: 23.5px;
    width: 23.5px;
    transform: rotate(-45deg);
    margin-bottom: 30px;
    margin-right: 30px;
    color: #7fb3ff;
    font-size: 40px;
`

const Label = styled.label`
    position: absolute;
    top: 0;
    left: 45px;
    font-weight: 300;
    opacity: 1;
`


type _Stock = {
    name: string,
    symbol: string
}

type SearchProps = {
    search: (query: string) => void,
    addToFavorites: (ticker: string) => void,
    removeFromFavorites: (ticker: string) => void,
    latestPrice?: number,
    primaryExchange: string | null,
    tags: string[],
    latestTime: string | null,
    isUSMarketOpen: boolean | null,
    price: _PriceSingleDataPoint,
    favorites?: string[],
}

type StockListItem = {
    symbol: string,
    name: string
}

type Error = {
    errorQuote: any,
}

const Search: React.FC<SearchProps & Error> = ({ 
    errorQuote, 
    search, 
    primaryExchange, 
    tags, 
    latestTime, 
    isUSMarketOpen, 
    favorites, 
    price: { 
        ticker, 
        change, 
        changePercent, 
        latestPrice 
    },
    addToFavorites,
    removeFromFavorites,
}) => {

    const [query, setQuery] = useState<string>('Apple Inc (AAPL)');
    const [stockList, setStockList] = useState<StockListItem[]>([])
    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)
    const [selectedStock, setSelectedStock] = useState<string[]>(['Apple Inc', '(AAPL)'])

    const onKeyPress = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            search(query)
            setQuery(`${stockList[0].name} (${stockList[0].symbol})`)
            setSelectedStock([`${stockList[0].name}`, `(${stockList[0].symbol})`])
            toggleIsOpen(false)
            handleBlur()
            event.preventDefault()
        }
    }

    const onStockClick = (stock: _Stock) => {
        const stockSymbol = stock.symbol.toLowerCase()
        const stockName = stock.name.toLowerCase()
        setQuery(`${stockName} (${stockSymbol})`)
        inputSelect.current!.blur()
        search(stockSymbol)
        setStockList([])
        toggleIsOpen(false)
        setSelectedStock([`${stockList[0].name}`, `(${stockList[0].symbol})`])
    }

    const handleBlur = () => {
        requestAnimationFrame(() => {
                if(!inputSelect.current!.contains(document.activeElement) && !dropSelect.current!.contains(document.activeElement)) {
                    toggleIsOpen(false)
                } else {
                    inputSelect.current!.focus()
                }
        })
    }

    const inputClickHandler = () => {
        setQuery('')
        setSelectedStock([])
    }

    const favoritesClickHandler = () => {
        addToFavorites('aobc')
    }

    useEffect(() => {
        toggleIsOpen(stockList.length !== 0)
        if(errorQuote) {
            setStockList([{name: errorQuote.message, symbol:'⊗'}])
        }
    }, [stockList.length, errorQuote])

    const renderStock = (stock: _Stock) => {
        return (
            <>
            {!errorQuote ? 
                <Stock onClick={() => onStockClick(stock)}>{stock.name} ({stock.symbol})</Stock>
                :
                <StockError>{stock.name} {stock.symbol}</StockError>
            }
            </>
        )
    }

    useEffect(() => {

        if(query === '') {
            return setStockList([])
        }

        let isCleared = false;

        const timeoutId = setTimeout(async () => {
            const response = await fetch(`http://localhost:4000/stock/search/${query}`)
            const data = await response.json()
            if (!isCleared) {
                setStockList(data)
            }
        }, 300);
        return () => { clearTimeout(timeoutId); isCleared = true }
    }, [query]);


    return (
        <SearchContainer>
            <RowContainer>
                <PriceGroup>
                    <SearchIcon>⚲</SearchIcon>
                    <Input id='search' ref={inputSelect} value={query} onClick={inputClickHandler} onChange={(event: any) => { setQuery(event.target.value); toggleIsOpen(query.length > 0) }} onKeyPress={onKeyPress} onBlur={handleBlur} />
                    {query && (
                    <Label htmlFor='search'>
                        <span>{selectedStock[0]}</span>
                        <span style={{color: '#beccdc', marginLeft: '10px'}}>{selectedStock[1]}</span>
                    </Label>
                    )}
                </PriceGroup>
                {latestPrice && <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />}
                <StockList ref={dropSelect} tabIndex={-1}>
                    {isOpen ? stockList.map( stock => renderStock(stock)) : null}
                </StockList>
            </RowContainer>
            {
                !errorQuote ?
                <SubSearch>
                    <SubInput>
                        <Sub1>{primaryExchange}</Sub1>
                        <Sub>{tags[0]}</Sub>
                        <Sub>{tags[1]}</Sub>
                    </SubInput>
                    <DateOpen>
                        {latestTime ? <Time>Real-Time Price as of {latestTime} EST</Time> : null}
                        {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon color='yellow'>☀</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽</MarketIcon> Market Closed</MarketStatus>}
                    </DateOpen>
                </SubSearch>
                :
                <SubError />
            }
           <Star favorites={favorites} ticker={ticker} add={addToFavorites} remove={removeFromFavorites}/>
        </SearchContainer>
    )

}

export default Search;

// ⚲

                    {/* <Button onClick={inputClickHandler}></Button> */}
                    {/* {isFavorite ? <span onClick={favoritesClickHandler} >&#9733;</span> : <span onClick={favoritesClickHandler} >&#9734;</span> } */}
                    {/* <Star favorites={favorites} ticker={ticker} add={addToFavorites} remove={removeFromFavorites} /> */}