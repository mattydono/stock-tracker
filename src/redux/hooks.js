import { useEffect, useState } from 'react';
import { createURL, fetchData } from './helpers';

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

const useTicker = (myticker, { quote, news, company, peers, favorites }) => {

    const [errors, setErrors] = useState(errorInitialState);
    const [isFetching, setIsFetching] = useState(isFetchingInitialState);
    const [ticker, setTicker] = useState(myticker);
    const [favoritesArray, setFavoritesArray] = useState(['msft', 'amzn', 'fb']);

    useEffect(() => {
        const fetchCompany = () => fetchData(createURL(ticker, 'company'), company, () => setErrors(state => ({ ...state, company: true })), (bool) => setIsFetching(state => ({ ...state, company: bool })));
        const fetchNews = () => fetchData(createURL(ticker, 'news'), news, () => setErrors(state => ({ ...state, news: true })), (bool) => setIsFetching(state => ({ ...state, news: bool })));
        const fetchQuote = () => fetchData(createURL(ticker, 'quote'), quote, () => setErrors(state => ({ ...state, quote: true })), (bool) => setIsFetching(state => ({ ...state, quote: bool })));
        const fetchPeers = () => fetchData(createURL(ticker, 'peers'), peers, () => setErrors(state => ({ ...state, peers: true })), (bool) => setIsFetching(state => ({ ...state, peers: bool })));
        const pollingQuote = (fetchCompany() && fetchNews() && fetchQuote() && fetchPeers() && false) || window.setInterval(fetchQuote, 5000);
        const pollingNews = window.setInterval(fetchNews, 30000);
        return () => {
            clearInterval(pollingQuote);
            clearInterval(pollingNews);
        }
    }, [ticker])

    useEffect(() => {
        const fetchFavorites = () => fetchData(
            createURL(favoritesArray, 'favorites'), 
            favorites, 
            () => setErrors(state => ({ ...state, favorites: true })), 
            (bool) => setIsFetching(state => ({ ...state, favorites: bool }))
        );
        fetchFavorites();
        const favoritesPolling = window.setInterval(fetchFavorites, 7000);
        return () => {
            clearInterval(favoritesPolling);
        }
    }, [favoritesArray]);

    return [setTicker, setFavoritesArray, errors, isFetching];
}

export default useTicker;