import { useEffect, useState } from 'react';
import { createURL, fetchData } from './helpers';

const errorInitialState = {
    quote: false,
    news: false,
    company: false,
    peers: false,
}

const isFetchingInitialState = {
    quote: false,
    news: false,
    company: false,
    peers: false,
}

const useTicker = (myticker, { quote, news, company, peers }) => {

    const [errors, setErrors] = useState(errorInitialState);
    const [isFetching, setIsFetching] = useState(isFetchingInitialState);
    const [ticker, setTicker] = useState(myticker)

    useEffect(() => {
        const fetchCompany = () => fetchData(createURL(ticker, 'company'), company, () => setErrors(state => ({ ...state, company: true })), (bool) => setIsFetching(state => ({ ...state, company: bool })));
        const fetchNews = () => fetchData(createURL(ticker, 'news'), news, () => setErrors(state => ({ ...state, news: true })), (bool) => setIsFetching(state => ({ ...state, news: bool })));
        const fetchQuote = () => fetchData(createURL(ticker, 'quote'), quote, () => setErrors(state => ({ ...state, quote: true })), (bool) => setIsFetching(state => ({ ...state, quote: bool })));
        const fetchPeers = () => fetchData(createURL(ticker, 'peers'), peers, () => setErrors(state => ({ ...state, peers: true })), (bool) => setIsFetching(state => ({ ...state, peers: bool })));
        const polling = (fetchCompany() && fetchNews() && fetchQuote() && fetchPeers() && false) || window.setInterval(fetchQuote, 5000);
        const poll = window.setInterval(fetchNews, 30000)
        return () => {
            clearInterval(polling);
            clearInterval(poll);
        }
    }, [ticker])

    return [setTicker, errors, isFetching];
}

export default useTicker;