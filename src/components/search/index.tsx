import React, { useState, useEffect, useRef } from 'react';
import TickerCard from './tickerCard';
import './index.css'

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
        return <div className='Stock' onClick={() => onStockClick(stock)}>{stock.name} ({stock.symbol})</div>
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
        <div className='SearchContainer'>
            <div className='RowContainer'>
                <div className='PriceGroup'>
                    <span className='IconAlign'><span className='Icon'>⚲</span></span>
                    <input className='InputButton' ref={inputSelect} placeholder='Stock Search Here' value={query} onClick={inputClickHandler} onChange={event => { setQuery(event.target.value); toggleIsOpen(query.length > 0) }} onKeyPress={onKeyPress} onBlur={handleBlur} />
                </div>
                <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />
                {/* <div className='PriceStats'>
                    {latestPrice ? <span className='PriceSpan'><span className='DollarIcon'>$</span>{latestPrice}</span> : null}
                    {!change ? null : change > 0 ? <span className='Span positive'><span className='PriceIcon'>&#8593;</span>{Math.abs(change)}</span> : <span className='Span'><span className='PriceIcon'>&#8595;</span>{Math.abs(change)}</span>} {!change ? null : change > 0 ? <span className='Span positive'>|</span> : <span className='Span'>|</span> }
                    {!changePercent ? null : changePercent > 0 ? <span className='Span positive'>{Math.abs(Math.round((changePercent * 100) * 100) / 100)}<span className='PriceIcon'>&#37;</span></span> : <span className='Span'>{Math.abs(Math.round((changePercent * 100) * 100) / 100)}<span className='PriceIcon'>&#37;</span></span>}
                </div> */}
                <div className='StockList' ref={dropSelect} tabIndex={-1}>
                    {isOpen ? stockList.map( stock => renderStock(stock)) : null}
                </div>
            </div>
            <div className='SubSearch'>
                <div className='SubInput'>
                    <span className='Sub'>{primaryExchange}</span>
                    <span className='Sub'>{tags[0]}</span>
                    <span className='Sub'>{tags[1]}</span>
                </div>
                <div className='DateOpen'>
                    {latestTime ? <span className='Time'>Real-Time Price as of {latestTime} EST</span> : null}
                    {tags.length < 1 ? null : isUSMarketOpen ? <span className='MarketStatus'><span className='MarketIcon open'>☀</span>Market Open</span> : <span className='MarketStatus'><span className='MarketIcon'>☽</span> Market Closed</span>}
                </div>
            </div>
        </div>
    )

}

export default Search;