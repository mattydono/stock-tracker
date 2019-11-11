import React, { useState, useEffect, useRef, FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled'
import { PriceSingleDataPoint, AppState } from '../../models';
import { TickerCard, SearchBar, StockList, DateTime, Tags } from './components'
import { socketService } from '../../services/socketService'
import { updateStockList } from './redux/actions';

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

const socket = socketService.get();

export const Search: FC = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState<string>('Apple Inc (AAPL)');
    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)
    const [selectedStock, setSelectedStock] = useState<string[]>(['Apple Inc', '(AAPL)'])

    const tags: string[] = useSelector(({ companyOverview: { tags }}: AppState) => tags);
    const primaryExchange: string | null = useSelector(({ keyStats: { primaryExchange } }: AppState) => primaryExchange);
    const isUSMarketOpen: boolean = useSelector(({ keyStats: { isUSMarketOpen } }: AppState) => isUSMarketOpen)
    const price: PriceSingleDataPoint = useSelector((store: AppState) => {
        return store.prices.find(({ ticker }) => ticker === store.search.ticker) || store.prices[0];
    });
    const latestTime: string | null = useSelector(({ keyStats: { latestTime } }: AppState) => latestTime)
    const errorQuote = ''

    const stockList = useSelector((state: AppState) => state.search.stockList)

    useEffect(() => {
        if(errorQuote.length > 0) {
            dispatch(updateStockList([{name: errorQuote, symbol:'⊗'}]))
        }
    }, [errorQuote])

    useEffect(() => {
        toggleIsOpen(stockList.length !== 0)
    },[ stockList.length])

    useEffect(() => {
        if(query === '') {
            dispatch(updateStockList([]))
            return;
        }

        socket.emit('search', query);
    }, [query]);

    return (
        <SearchLayoutContainer>
            <SearchRowLayoutContainer>
                <SearchBar inputSelect={inputSelect} dropSelect={dropSelect} setQuery={setQuery} isOpen={isOpen} toggleIsOpen={toggleIsOpen} query={query} setSelectedStock={setSelectedStock} selectedStock={selectedStock} socket={socket} />
                <TickerCard {...price} />
                {isOpen && <StockList setQuery={setQuery} inputSelect={inputSelect} setSelectedStock={setSelectedStock} dropSelect={dropSelect} /> }
            </SearchRowLayoutContainer>
            <DateRowLayoutContainer>
                {primaryExchange && <Tags primaryExchange={primaryExchange} tags={tags} />}
                {primaryExchange && <DateTime latestTime={latestTime} tags={tags} isUSMarketOpen={isUSMarketOpen} />}
            </DateRowLayoutContainer>
        </SearchLayoutContainer>
    )

}
