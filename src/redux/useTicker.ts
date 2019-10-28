import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { _PriceSingleDataPoint } from '../models/prices';
import { _CompanyOverview } from '../components/companyOverview/models/companyOverview';
import { _News } from '../components/news/models/news';
import { _KeyStats } from '../components/keystats/models/keyStats';

interface TickerProps {
    ticker: string,
    favorites: string[],
    resetState: () => void,
    callbacks: {
        quote: (stats: _KeyStats) => void,
        news: (arr: _News) => void,
        company: (company: _CompanyOverview) => void,
        peers: (arr: string[]) => void,
        prices: (arr: _PriceSingleDataPoint[]) => void,
    }
}

const errorInitialState = {
    quote: false,
    news: false,
    company: false,
    peers: false,
    favorites: false,
}

const isFetchingInitialState = {
    quote: false,
    news: false,
    company: false,
    peers: false,
    favorites: false,
}

const socket = io('http://localhost:4000');

const useTicker = ({ticker, favorites: favoritesArray, callbacks: { quote, news, company, peers, prices }, resetState}: TickerProps) => {

    const [errors, setErrors] = useState(errorInitialState);
    const [isFetching] = useState(isFetchingInitialState);

    useEffect(() => {
        socket.emit('company', ticker);
        socket.on('company', (result: _CompanyOverview) => company(result));
        socket.emit('keystats', ticker);
        socket.on('keystats', (result: _KeyStats) => quote(result));
        socket.emit('news', ticker);
        socket.on('news', (result: _News) => news(result));
        socket.on('error', (err: string) => setErrors(state => ({ ...state, [err]: true })));

        return () => resetState()

    }, [ticker])

    useEffect(() => {
        const request = Array.from(new Set([...favoritesArray, ticker])).join(',');
        socket.emit('prices', request);
        socket.on('prices', (result: _PriceSingleDataPoint[]) => prices(result));
        
        return () => {
            socket.emit('unsubscribePrices')
        }
    }, [ticker, favoritesArray]);

    return [errors, isFetching];
}

export default useTicker;