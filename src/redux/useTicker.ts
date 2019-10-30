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
        prices: (arr: string[]) => void,
    }
}

export interface ErrorsState {
    quote: boolean,
    news: boolean,
    company: boolean,
    peers: boolean,
    favorites: boolean,
}

export interface isFetchingState {
    quote: boolean,
    news: boolean,
    company: boolean,
    peers: boolean,
    favorites: boolean,
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

const useTicker = ({ticker, favorites: favoritesArray, resetState}: TickerProps) => {

    const [errors, setErrors] = useState<ErrorsState>(errorInitialState);
    const [isFetching] = useState<isFetchingState>(isFetchingInitialState);

    useEffect(() => {
        const request = Array.from(new Set([...favoritesArray, ticker]));
        //socket.emit('prices', request);
        // socket.on('prices', (result: _PriceSingleDataPoint[]) => prices(result));
        
        return () => {
            socket.emit('unsubscribePrices', [ticker])
        }
    }, [ticker, favoritesArray]);

    return [errors, isFetching];
}

export default useTicker;