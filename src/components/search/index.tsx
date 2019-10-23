import React, { useState, useEffect, useRef } from 'react';
import { _PriceSingleDataPoint } from '../../models';
import TickerCard from './tickerCard';
import styled from '@emotion/styled'
import io from 'socket.io-client';
import moment from 'moment'

const SearchContainer = styled.div`
    flex: 1 0 auto;
    margin-bottom: -40px;
    @media(max-width: 1000px) {
        margin-bottom: -20px;
    }
    @media(max-width: 375px) {
        margin-top: 20px;
    }
`

const RowContainer = styled.div`
    min-height: 48px;
    padding-bottom: 7px;
    position: relative;
    font-size: 40px;
    border-bottom: 1px solid #608fd1;;
    display: flex;
    @media(max-width: 1000px) {
        flex-direction: column-reverse;
    };
    @media(max-width: 588px) {
        font-size: 30px;
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
    font-weight: 300;
    z-index: 2;
    &:focus {
        color: #fff;
    };
    &:focus + label {
        display: none;
    };
`

const PriceGroup = styled.div`
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: center;
    position: relative;
`

const SubSearch = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    @media(max-width: 375px) {
        display: none;
    }
`

const SubInput = styled.div`
    display: flex;
    flex-direction: row;
`

const Sub = styled.span`
    background-color: #415f8a;
    border-radius: 2px;
    height: 22px;
    font-size: 14px;
    margin-right: 11px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
`

const DateOpen = styled.div`
    font-size: 14px;
    display: flex;
    font-weight: 300;
    justify-content: flex-end;
    margin-left: 5px;
`

const Time = styled.span`
    color: rgba(255, 255, 255, 0.8);
    @media(max-width: 750px) {
        display: none;
    }
`

const MarketStatus = styled.span`
    font-size: 14px;
    font-weight: 400;
    display: flex;
    margin-left: 25px;
    position: relative;
`

const MarketIcon = styled.div(props => ({
    color: props.color ? 'yellow' : 'gray',
    fontSize: '15px',
    position: 'absolute',
    top: '-2px',
    left: '-15px',
}))

const StockList = styled.div`
    position: absolute;
    margin: 0 2.5% 0 2.5%;
    width: 100%;
    top: 63px;
    left: -2.5%;
    z-index: 1;
    outline: none;
    background-image: linear-gradient(to bottom, #001330 2%, rgba(0, 8, 19, 0.8) 177%);
    box-shadow: 0 7px 10px 5px rgba(0, 0, 0, 0.5);
    padding-top: 19px;
    padding-bottom: 29px;
    @media(max-width: 1000px) {
        top: 126px;
    };
`

const TdSymbol = styled.td`
    color: #0068ff;
    padding-top: 8px;
    padding-bottom: 8px;
    max-width: 12px;
`

const TdName = styled.td`
    color: #fff;
    padding-top: 8px;
    padding-bottom: 8px;
    position: absolute;
    left: 60px;
`

const TR = styled.tr`
    margin-bottom: 100%;
    position: relative;
    &:hover {
        background-color: rgba(0, 104, 255, 0.5);
        cursor: pointer;
        padding-right: 100%;
    }
`

const TdEx = styled.span`
    font-size: 14px;
    padding: 2px;
    background-color: rgba(128, 180, 255, 0.13);
    border-radius: 2px;
    color:rgba(255,255,255, 0.5);
    margin-left: 10px;
`

const SubError = styled.div`
    display: flex;
    margin-top: 15px;
    opacity: 0;
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
    top: 1px;
    left: 52px;
    font-weight: 300;
    opacity: 1;
    overflow: auto;
    display: flex;
    z-index: 1;
    @media(max-width: 650px) {
        margin-top: 5px;
    };
    @media(max-width: 500px) {
        margin-top: 5px;
    };
`

const LabelName = styled.div`
    flex: 1 0 0;
    min-height: 30px;
    overflow: auto;
`

const LabelSymbol = styled.div`
    flex: 0 1 0;
    color: #beccdc;
    margin-left: 15px;
`

type _Stock = {
    name: string,
    symbol: string,
    exchange?: string
}

type SearchProps = {
    search: (query: string) => void,
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

const socket = io('http://localhost:4000');

const Search: React.FC<SearchProps & Error> = ({ 
    errorQuote, 
    search, 
    primaryExchange, 
    tags, 
    latestTime, 
    isUSMarketOpen, 
    price: { 
        change, 
        changePercent, 
        latestPrice 
    }
}) => {

    const [query, setQuery] = useState<string>('Apple Inc (AAPL)');
    const [stockList, setStockList] = useState<StockListItem[]>([])
    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)
    const [selectedStock, setSelectedStock] = useState<string[]>(['Apple Inc', '(AAPL)'])

    const onKeyPress = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            socket.emit('isValid', query);
            socket.on('isValid', (bool: boolean) => {
                if(bool) {
                    search(query)
                    setQuery(`${stockList[0].name} (${stockList[0].symbol})`)
                    setQuery(`${stockList[0].name} (${stockList[0].symbol})`)
                    setSelectedStock([`${stockList[0].name}`, `(${stockList[0].symbol})`])
                }
            });
            toggleIsOpen(false)
            event.preventDefault();
        }
    }

    const onStockClick = (stock: _Stock) => {
        const stockSymbol = stock.symbol
        const stockName = stock.name
        setQuery(`${stockName} (${stockSymbol})`)
        inputSelect.current!.blur()
        search(stockSymbol)
        setStockList([])
        setSelectedStock([`${stock.name}`, `(${stock.symbol})`])
    }

    const handleBlur = () => {
        if(!isOpen) return
        
        requestAnimationFrame(() => {
                if(!inputSelect.current!.contains(document.activeElement) && !dropSelect.current!.contains(document.activeElement)) {
                    toggleIsOpen(false)
                } else {
                    inputSelect.current!.focus()
                }
        })
    }

    useEffect(() => {
        if(errorQuote) {
            setStockList([{name: errorQuote.message, symbol:'⊗'}])
        }
    }, [errorQuote])

    useEffect(() => {
        toggleIsOpen(stockList.length !== 0)
    },[ stockList.length])

    useEffect(() => {

        if(query === '') {
            return setStockList([])
        }

        socket.emit('search', query);

        socket.on('search', (result: StockListItem[]) => setStockList(result) )

    }, [query]);

    const renderSymbols = (stock: _Stock) => {
        return (
                <TR key={stock.name} onClick={() => onStockClick(stock)}>
                    <TdSymbol>{stock.symbol}</TdSymbol>
                    <TdName>{stock.name} <TdEx>{stock.exchange}</TdEx></TdName>
                </TR>
        )
    }


    const formatDate = (date: any) => new Date(date);
    const EST = formatDate(moment()).toLocaleString("en-US", {
        timeZone: "America/New_York"
      });
    const formattedEST = moment(EST).format("lll");

    return (
        <SearchContainer>
            <RowContainer>
                <PriceGroup>
                    <SearchIcon>⚲</SearchIcon>
                    <Input id='search' ref={inputSelect} value={query} onChange={(event: any) => { setQuery(event.target.value); toggleIsOpen(query.length > 0) }} onKeyPress={onKeyPress} onBlur={handleBlur} />
                    {query && (
                    <Label htmlFor='search'>
                        <LabelName>{selectedStock[0]}</LabelName>
                        <LabelSymbol>{selectedStock[1]}</LabelSymbol>
                    </Label>
                    )}
                </PriceGroup>
                {latestPrice && <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />}
                {isOpen ? 
                <StockList ref={dropSelect} tabIndex={-1}>
                    <table style={{width: '100%'}}>
                        <tbody style={{fontSize: '18px'}}>
                            {stockList.map( stock => renderSymbols(stock))}
                        </tbody> 
                    </table>               
                </StockList>
                :
                null
                }
            </RowContainer>
            {
                !errorQuote ?
                <SubSearch>
                    {primaryExchange && <SubInput>
                        <Sub>{primaryExchange}</Sub>
                        <Sub>{tags[0]}</Sub>
                        <Sub>{tags[1]}</Sub>
                        {/* <Sub>USD</Sub> */}
                    </SubInput>}
                    {primaryExchange && <DateOpen>
                        {latestTime ? <Time>Real-Time Price as of {formattedEST} EST</Time> : null}
                        {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon color='yellow'>☀</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽</MarketIcon> Market Closed</MarketStatus>}
                    </DateOpen>}
                </SubSearch>
                :
                <SubError />
            }
        </SearchContainer>
    )

}

export default Search;