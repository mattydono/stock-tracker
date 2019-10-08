import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled'

const SearchContainer = styled.div`
    grid-area: Search;
`

// ********************************************************************************************

const RowContainer = styled.div`
    position: relative;
    font-size: 20px;
    border-bottom: 1px solid #608fd1;;
    display: flex;
    @media(max-width: 800px) {flex-direction: column-reverse; justify-content: center;}
`

const Icon = styled.div`
    font-size: 30px;
    transform: rotate(-45deg);
    width: 30px;
    height: 30px;
    color: #608fd1;
    position: absolute;
`

const IconAlign = styled.div`
    flex: 0 0 30px;
    align-items: center;
    position: relative;
    top: -12%;
    left: 0;
    @media(max-width: 800px) {top: -6px;} 
`

const Input = styled.input`
    background-color: rgba(0,0,0,0);
    color: white;
    font-size: 30px;
    outline: none;
    border: none;
    flex: 1 0 0;
    @media(max-width: 800px) {font-size: 30px; margin-bottom: 10px};
`

const PriceStats = styled.div`
    font-size: 30px;
    display: flex;
    flex: 0 0 350px;
    height: 40px;
    @media(max-width: 800px) {flex: 0 0 100%; justify-content: center; margin-bottom: 20px;}
`

const PriceGroup = styled.div`
    display: flex;
    flex: 1 0 0;
`

type SpanProps = {
    positive?: boolean
}

const Span = styled('span')<SpanProps>`
    display: flex;
    font-size: 30px;
    color: ${props => props.positive ? 'green' : 'red'};
    margin-left: 10px;
    margin-right: 10px;
`

const PriceIcon = styled.div`
    height: 100%;
    font-size: 15px;
    align-self: flex-start;
    margin-top: 3px;
`

const PriceSpan = styled.div`
    display: flex;
    flex: 0 0 1;
    margin-right: 5px;
`

const DollarIcon = styled.div`
    height: 100%;
    font-size: 15px;
    margin-top: 3%;
    margin-right: 2px;
`

// ********************************************************************************************

const SubSearch = styled.div`
    display: flex;
    margin-top: 15px;
    @media(max-width: 800px) {flex-direction: column-reverse; align-items: center; margin-bottom: 30px};
`

const SubInput = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
    @media(max-width: 800px) {justify-content: space-evenly; margin: 0}
`

const Sub = styled.div`
    background-color: #41608a;
    border-radius: 5%;
    margin-left: 2%;
    padding: 1%;
`

const DateOpen = styled.div`
    font-size: 15px;
    display: flex;
    flex: 1 0 0;
    justify-content: flex-end;
    @media(max-width: 800px) {justify-content: center; margin-bottom: 20px};
`

const Time = styled.span`
    color: #608fd1
`

const MarketStatus = styled.div`
   font-size: 15px;
   display: flex;
   margin-left: 30px;
   position: relative;
`

type MarketIconProps = {
    open?: boolean
}

const MarketIcon = styled('div')<MarketIconProps>`
    color: ${props => props.open ? 'yellow' : 'gray'};
    font-size: 15px;
    position: absolute;
    top: -2px;
    left: -20px;
`

// ********************************************************************************************

const StockList = styled.div`
    position: absolute;
    height: 100%;
    width: 95%;
    margin: 0 2.5% 0 2.5%;
    bottom: -100%;
    left: 0;
    z-index: 1;
`

const Stock = styled.div`
    background-color: rgba(0,24,57,0.9);
    color: #608fd1;
    cursor: pointer;
    &:hover {
        background-color: #0042a0;
    } 
`

type _Stock = {
    name: string,
    symbol: string
}

type SearchProps = {
    search: (query: string) => void,
    change: number | null,
    changePercent: number | null,
    latestPrice?: number,
    primaryExchange: string | null,
    tags: string[],
    latestTime: string | null,
    isUSMarketOpen: boolean | null,    
}

type StockListItem = {
    symbol: string,
    name: string
}

const Search: React.FC<SearchProps> = ({ search, change, changePercent, latestPrice, primaryExchange, tags, latestTime, isUSMarketOpen }) => {

    const [query, setQuery] = useState<string>('Apple Inc. (AAPL)');
    const [stockList, setStockList] = useState<StockListItem[]>([])
    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)

    const onKeyPress = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            search(query)
            setQuery(`${stockList[0].name} (${stockList[0].symbol})`)
            toggleIsOpen(false)
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
    }

    useEffect(() => {
        toggleIsOpen(stockList.length !== 0)
    }, [stockList.length])

    const renderStock = (stock: _Stock) => {
        return <Stock onClick={() => onStockClick(stock)}>{stock.name} ({stock.symbol})</Stock>
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
                    <IconAlign><Icon>⚲</Icon></IconAlign>
                    <Input ref={inputSelect} placeholder='Stock Search Here' value={query} onClick={inputClickHandler} onChange={event => { setQuery(event.target.value); toggleIsOpen(query.length > 0) }} onKeyPress={onKeyPress} onBlur={handleBlur} />
                </PriceGroup>
                <PriceStats>
                    {latestPrice ? <PriceSpan><DollarIcon>$</DollarIcon>{latestPrice}</PriceSpan> : null}
                    {!change ? null : change > 0 ? <Span positive><PriceIcon>&#8593;</PriceIcon>{Math.abs(change)}</Span> : <Span><PriceIcon>&#8595;</PriceIcon>{Math.abs(change)}</Span>} {!change ? null : change > 0 ? <Span positive>|</Span> : <Span>|</Span> }
                    {!changePercent ? null : changePercent > 0 ? <Span positive>{Math.abs(Math.round((changePercent * 100) * 100) / 100)}<PriceIcon>&#37;</PriceIcon></Span> : <Span>{Math.abs(Math.round((changePercent * 100) * 100) / 100)}<PriceIcon>&#37;</PriceIcon></Span>}
                </PriceStats>
                <StockList ref={dropSelect} tabIndex={-1}>
                    {isOpen ? stockList.map( stock => renderStock(stock)) : null}
                </StockList>
            </RowContainer>
            <SubSearch>
                <SubInput>
                    <Sub>{primaryExchange}</Sub>
                    <Sub>{tags[0]}</Sub>
                    <Sub>{tags[1]}</Sub>
                </SubInput>
                <DateOpen>
                    {latestTime ? <Time>Real-Time Price as of {latestTime} EST</Time> : null}
                    {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon open>☀</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽</MarketIcon> Market Closed</MarketStatus>}</DateOpen>
            </SubSearch>
        </SearchContainer>
    )

}

export default Search;