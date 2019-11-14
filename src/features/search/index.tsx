import React, { useState, useEffect, useRef, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled'
import { AppState } from 'models';
import { TickerCard, SearchBar, StockList, DateTime, Tags } from './components'
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

export const Search: FC = () => {

    const dispatch = useDispatch();

    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const dropSelect = useRef<HTMLDivElement>(null)
    const inputSelect = useRef<HTMLInputElement>(null)
    const [selectedStock, setSelectedStock] = useState(['Apple Inc', '(AAPL)'])

    const tags = useSelector((state: AppState) => state.companyOverview.tags);
    const primaryExchange = useSelector((state: AppState) => state.keyStats.primaryExchange);
    const isUSMarketOpen = useSelector((state: AppState) => state.keyStats.isUSMarketOpen)
    const price = useSelector((store: AppState) => {
        return store.prices.find(({ ticker }) => ticker === store.search.ticker) || store.prices[0];
    });
    const latestTime = useSelector((state: AppState) => state.keyStats.latestTime)
    const errorQuote = ''

    useEffect(() => {
        if(errorQuote.length > 0) {
            dispatch(updateStockList([{name: errorQuote, symbol:'⊗'}]))
        }
    }, [errorQuote])

    return (
        <SearchLayoutContainer>
            <SearchRowLayoutContainer>
                <SearchBar inputSelect={inputSelect} dropSelect={dropSelect} isOpen={isOpen} toggleIsOpen={toggleIsOpen} setSelectedStock={setSelectedStock} selectedStock={selectedStock} />
                <TickerCard {...price} />
                {isOpen && <StockList inputSelect={inputSelect} setSelectedStock={setSelectedStock} dropSelect={dropSelect} isOpen={isOpen} /> }
            </SearchRowLayoutContainer>
            <DateRowLayoutContainer>
                {primaryExchange && <Tags primaryExchange={primaryExchange} tags={tags} />}
                {primaryExchange && <DateTime latestTime={latestTime} tags={tags} isUSMarketOpen={isUSMarketOpen} />}
            </DateRowLayoutContainer>
        </SearchLayoutContainer>
    )

}
