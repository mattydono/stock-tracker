import React, { useState, useEffect, useRef, memo } from 'react';
import { _PriceSingleDataPoint } from '../../models/prices';
import TickerCard from './tickerCard';
import styled from '@emotion/styled'
import moment from 'moment'
import { socketService } from '../../services/socket-service'
import { SearchBar } from'./components/search-bar'
import { StockList } from './components/stockList'

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

const SubError = styled.div`
    display: flex;
    margin-top: 15px;
    opacity: 0;
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

    const formatDate = (date: any) => new Date(date);
    const EST = formatDate(moment()).toLocaleString("en-US", {
        timeZone: "America/New_York"
      });
    const formattedEST = moment(EST).format("lll");

    return (
        <SearchContainer>
            <RowContainer>
                <SearchBar inputSelect={inputSelect} dropSelect={dropSelect} setQuery={setQuery} isOpen={isOpen} toggleIsOpen={toggleIsOpen} search={search} query={query} stockList={stockList} setSelectedStock={setSelectedStock} selectedStock={selectedStock} socket={socket} />
                {latestPrice && <TickerCard error={error} latestPrice={latestPrice} change={change} changePercent={changePercent} />}
                {isOpen && <StockList setQuery={setQuery} inputSelect={inputSelect} search={search} setStockList={setStockList} setSelectedStock={setSelectedStock} dropSelect={dropSelect} stockList={stockList} /> }
            </RowContainer>
            <SubSearch>
                {primaryExchange && <SubInput>
                    <Sub>{primaryExchange}</Sub>
                    <Sub>{tags[0]}</Sub>
                    <Sub>{tags[1]}</Sub>
                </SubInput>}
                {primaryExchange && <DateOpen>
                    {latestTime ? <Time>Real-Time Price as of {formattedEST} EST</Time> : null}
                    {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon color='yellow'>☀</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽</MarketIcon> Market Closed</MarketStatus>}
                </DateOpen>}
            </SubSearch>
        </SearchContainer>
    )

}

export default memo(Search);