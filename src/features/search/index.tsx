import React, { useState, useEffect, useRef, FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled'
import { PriceSingleDataPoint, AppState } from '../../models';
import { TickerCard, SearchBar, StockList, DateTime, Tags } from './components'
import { socketService } from '../../services/socketService'
import { updateTicker } from './redux/actions';

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

type Search = (query: string) => void;

type StockListItem = {
    symbol: string,
    name: string
}

const socket = socketService.get();

export const Search: FC = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState('Apple Inc (AAPL)');
    const [stockList, setStockList] = useState<StockListItem[]>([])
    const [isOpen, toggleIsOpen] = useState(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)
    const [selectedStock, setSelectedStock] = useState(['Apple Inc', '(AAPL)'])

    const tags = useSelector((state: AppState) => state.companyOverview.tags);
    const primaryExchange = useSelector((state: AppState) => state.keyStats.primaryExchange);
    const isUSMarketOpen = useSelector((state: AppState) => state.keyStats.isUSMarketOpen)
    const price = useSelector((store: AppState) => {
        const { search, prices } = store;
        return prices.find(({ ticker }) => ticker === search) || prices[0];
    });
    const latestTime = useSelector((state: AppState) => state.keyStats.latestTime)
    const search = useCallback((query: string) => dispatch(updateTicker(query)), [query, dispatch]);
    const errorQuote = ''

    useEffect(() => {
        if(errorQuote.length > 0) {
            setStockList([{name: errorQuote, symbol:'⊗'}])
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
                <TickerCard {...price} />
                {isOpen && <StockList setQuery={setQuery} inputSelect={inputSelect} search={search} setStockList={setStockList} setSelectedStock={setSelectedStock} dropSelect={dropSelect} stockList={stockList} /> }
            </SearchRowLayoutContainer>
            <DateRowLayoutContainer>
                {primaryExchange && <Tags primaryExchange={primaryExchange} tags={tags} />}
                {primaryExchange && <DateTime latestTime={latestTime} tags={tags} isUSMarketOpen={isUSMarketOpen} />}
            </DateRowLayoutContainer>
        </SearchLayoutContainer>
    )

}
