import React, { useEffect } from 'react';
import { MapDispatchToProps, MapStateToProps } from 'react-redux'
import { _StateProps, _DispatchProps } from '../models/props'
import { _AppState } from '../redux/reducer'
import Search from './search';
import CompanyOverview from './companyOverview.js';
import KeyStats from './keystats';
import News from './news';
import Peers from './peers';
import Chart from './charts';
import Header from './header';
import Footer from './footer';
import useTicker from '../redux/useTicker';

import './root.css'

import {
    updateTicker,
    updateCompany,
    updateKeyStats,
    updateNews,
    updatePeers,
    updateChartRange,
    updateChartData,
    updateFavoritesAddTicker,
    updateFavoritesRemoveTicker,
    updatePricesData,
} from '../redux/actions'

import { connect } from 'react-redux';

const Root: React.FC<_StateProps & _DispatchProps> = ({ 
    ticker, 
    peers, 
    companyOverview, 
    keyStats, 
    callbacks, 
    search, 
    news,
    chartProps,
    favorites,
    prices,
    updateChartRange,
    updateChartPrices,
    searchProps
}) => {

    const [updateTicker, updateFavorites, errors, fetching]:any = useTicker(ticker, callbacks);

    const { news: isFetchingNews = false, quote: isFetchingQuote = false, company: isFetchingCompany = false, peers: isFetchingPeers = false } = fetching;

    const { news: errorNews, quote: errorQuote = false, company: errorCompany = false, peers: errorPeers = false } = errors;

    useEffect(() => {
        updateTicker(ticker);
    }, [ticker])


    return (
        <div className='RootContainer'>
            <div className='AppContainer'>
                <Header />
                <Search 
                search={search} 
                errorQuote={errorQuote}
                {...searchProps}
                />
                <div className='ChartNews'>
                    <Chart 
                        {...chartProps}
                        updateChartPrices={updateChartPrices} 
                        updateChartRange={updateChartRange}
                    />
                    <News errorNews={errorNews} news={news}/>
                </div>
                <div className='StatsCompany'>
                    <KeyStats errorQuote={errorQuote} isFetchingQuote={isFetchingQuote} {...keyStats}/>
                    <div className='CompanyContainer'>
                        <CompanyOverview errorCompany={errorCompany} isFetchingCompany={isFetchingCompany} {...companyOverview} />
                        <Peers errorPeers={errorPeers} isFetchingPeers={isFetchingPeers} peers={peers} />
                    </div>
                </div>
            </div>
            <Footer favorites={favorites} prices={prices} />
        </div>
    )
}

const mapStateToProps: MapStateToProps<_StateProps, {}, _AppState> = state => {
    const { companyOverview, search, keyStats, news, peers, favorites, prices, charts } = state;
    const { isUSMarketOpen, primaryExchange, latestTime, ...keyStatsProps } = keyStats;
    const { tags } = companyOverview;
    const { range, prices: chartPrices } = charts;
    const price = prices.filter(({ ticker }) => ticker === search)[0] || prices[0];

    const { ticker, latestPrice: latest } = price;

    const footerProps = { prices, favorites };
    const searchProps = { primaryExchange, latestTime, isUSMarketOpen, tags, price };
    const chartProps = {
        range,
        prices: chartPrices,
        ticker,
        latest,
        open: isUSMarketOpen
    };

    return ({
        companyOverview,
        ticker: search,
        keyStats,
        news,
        peers,
        favorites,
        prices,
        footerProps,
        searchProps,
        chartProps
    })
}

const mapDispatchToProps: MapDispatchToProps<_DispatchProps, {}> = dispatch => ({
    search: query => dispatch(updateTicker(query)),
    updateChartRange: range => dispatch(updateChartRange(range)),
    updateChartPrices: prices => dispatch(updateChartData(prices)),
    callbacks: {
        company: company => dispatch(updateCompany(company)),
        quote: quote => dispatch(updateKeyStats(quote)),
        news: news => dispatch(updateNews(news)),
        peers: peers => dispatch(updatePeers(peers)),
        favorites: {
            add: ticker => dispatch(updateFavoritesAddTicker(ticker)),
            remove: ticker => dispatch(updateFavoritesRemoveTicker(ticker)),
        },
        prices: prices => dispatch(updatePricesData(prices))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);