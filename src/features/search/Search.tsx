import React, { useState, useEffect, useRef, memo } from 'react';
import { _PriceSingleDataPoint } from '../../models/prices';
import TickerCard from './components/tickerCard';
import styled from '@emotion/styled'
import { socketService } from '../../services/socket-service'
import { SearchBar } from'./components/search-bar'
import { StockList } from './components/stockList'
import { DateTime } from './components/date'
import { Tags } from './components/tags'

const SearchLayoutContainer = styled.div`
    flex: 1 0 auto;
    margin-bottom: -40px;
    @media(max-width: 1000px) {
        margin-bottom: -20px;
    }
    @media(max-width: 375px) {
        margin-top: 20px;
    }
`

const SearchRowLayoutContainer = styled.div`
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

const DateRowLayoutContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    @media(max-width: 375px) {
        display: none;
    }
`

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
    errorQuote: {
        message: string
    }
}

const socket = socketService.get();

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
        latestPrice,
        error
    }
}) => {

    const [query, setQuery] = useState<string>('Apple Inc (AAPL)');
    const [stockList, setStockList] = useState<StockListItem[]>([])
    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)
    const [selectedStock, setSelectedStock] = useState<string[]>(['Apple Inc', '(AAPL)'])

    useEffect(() => {
        if(errorQuote.message.length > 0) {
            setStockList([{name: errorQuote.message, symbol:'⊗'}])
        }
    }, [errorQuote])

    useEffect(() => {
        toggleIsOpen(stockList.length !== 0)
    },[ stockList.length])

    useEffect(() => {
        socket.on('search', setStockList)
        return () => void socket.off('search', setStockList);
    }, []);

    useEffect(() => {
        if(query === '') {
            setStockList([]);
            return;
        }

        socket.emit('search', query);
    }, [query]);

    return (
        <SearchLayoutContainer>
            <SearchRowLayoutContainer>
                <SearchBar inputSelect={inputSelect} dropSelect={dropSelect} setQuery={setQuery} isOpen={isOpen} toggleIsOpen={toggleIsOpen} search={search} query={query} stockList={stockList} setSelectedStock={setSelectedStock} selectedStock={selectedStock} socket={socket} />
                {latestPrice && <TickerCard error={error} latestPrice={latestPrice} change={change} changePercent={changePercent} />}
                {isOpen && <StockList setQuery={setQuery} inputSelect={inputSelect} search={search} setStockList={setStockList} setSelectedStock={setSelectedStock} dropSelect={dropSelect} stockList={stockList} /> }
            </SearchRowLayoutContainer>
            <DateRowLayoutContainer>
                {primaryExchange && <Tags primaryExchange={primaryExchange} tags={tags} />}
                {primaryExchange && <DateTime latestTime={latestTime} tags={tags} isUSMarketOpen={isUSMarketOpen} />}
            </DateRowLayoutContainer>
        </SearchLayoutContainer>
    )

}

export default memo(Search);