import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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

const useTicker = ({ticker, favorites: favoritesArray, callbacks: { quote, news, company, peers, prices }, resetState}) => {

    const [errors, setErrors] = useState(errorInitialState);
    const [isFetching] = useState(isFetchingInitialState);

    useEffect(() => {
        socket.emit('company', ticker);
        socket.on('company', result => company(result));
        socket.emit('keystats', ticker);
        socket.on('keystats', result => quote(result));
        socket.emit('news', ticker);
        socket.on('news', result => news(result));
        socket.on('error', err => setErrors(state => ({ ...state, [err]: true })));

        return () => resetState()

    }, [ticker])

    useEffect(() => {
        const request = Array.from(new Set([...favoritesArray, ticker])).join(',');
        socket.emit('prices', request);
        socket.on('prices', result => prices(result));
        
        return () => {
            socket.emit('unsubscribePrices')
        }
    }, [ticker, favoritesArray]);

    return [errors, isFetching];
}

export default useTicker;