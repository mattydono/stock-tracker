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
import logo from '../components/header/logo.png'

import {
    updateTicker,
    updateCompany,
    updateKeyStats,
    updateNews,
    updatePeers,
    updateChartRange,
    updateChartData,
    updateFavoritesData,
} from '../redux/actions'

import { connect } from 'react-redux';

import styled from '@emotion/styled'

export const Title =styled.div`
    border-bottom: 2px solid #7fb3ff;
    width: 100%;
    padding-bottom: 2px;
    margin-bottom: 10px;
    color: #7fb3ff;
    font-weight: 700;
`

const RootContainer = styled.div`
    font-family: sans-serif;
    color: white;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    align-items: center;
    * {
        font-family: 'Lato', sans-serif;
    };
    @media(max-width: 750px) {
    }
`

const AppContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
    max-width: 1500px;
`

const CompanyContainer = styled.div`
    display: flex;
    flex: 0 1 35%;
    margin-left: 40px;
    flex-direction: column;
`

const ChartNews = styled.div`
    display: flex;
    flex: 1 0 auto;
    @media(max-width: 750px) {
        flex-direction: column;
    }
`

const StatsCompany = styled.div`
    display: flex;
    flex: 1 0 auto;
    @media(max-width: 750px) {
        flex-direction: column;
    }
`

const FooterLogo = styled.img`
    height: 40px;
    width: 100px;
    margin-left: 60%;
    @media(min-width: 375px) {
        display: none;
    }
`

const Root: React.FC<_StateProps & _DispatchProps> = ({ 
    ticker, 
    peers, 
    companyOverview, 
    keyStats, 
    callbacks, 
    search, 
    news,
    chart,
    favorites,
    updateChartRange,
    updateChartPrices,
}) => {

    const { isUSMarketOpen, latestPrice } = keyStats;

    const [updateTicker, updateFavorites, errors, fetching]:any = useTicker(ticker, callbacks);

    const { news: isFetchingNews = false, quote: isFetchingQuote = false, company: isFetchingCompany = false, peers: isFetchingPeers = false } = fetching;

    const { news: errorNews = false, quote: errorQuote = false, company: errorCompany = false, peers: errorPeers = false } = errors;

    useEffect(() => {
        updateTicker(ticker);
    }, [ticker])

    return (
        <RootContainer>
            <AppContainer>
                <Header />
                <Search 
                search={search} 
                errorQuote={errorQuote}
                {...keyStats} 
                {...companyOverview}
                />
                <ChartNews>
                    <Chart 
                        {...chart} 
                        ticker={ticker} 
                        open={isUSMarketOpen} 
                        latest={latestPrice} 
                        updateChartPrices={updateChartPrices} 
                        updateChartRange={updateChartRange}
                    />
                    <News errorNews={errorNews} isFetchingNews={isFetchingNews} news={news}/>
                </ChartNews>
                <StatsCompany>
                    <KeyStats errorQuote={errorQuote} isFetchingQuote={isFetchingQuote} {...keyStats}/>
                    <CompanyContainer>
                        <CompanyOverview errorCompany={errorCompany} isFetchingCompany={isFetchingCompany} {...companyOverview} />
                        <Peers errorPeers={errorPeers} isFetchingPeers={isFetchingPeers} peers={peers} />
                    </CompanyContainer>
                </StatsCompany>
            </AppContainer>
            <Footer favorites={favorites} />
            <FooterLogo src={logo} />
        </RootContainer>
    )
}

const mapStateToProps: MapStateToProps<_StateProps, {}, _AppState> = state => ({
    companyOverview: state.companyOverview,
    ticker: state.search,
    keyStats: state.keyStats,
    news: state.news,
    peers: state.peers,
    favorites: state.favorites,
    chart: {
        range: state.charts.range,
        prices: state.charts.prices,
    }
})

const mapDispatchToProps: MapDispatchToProps<_DispatchProps, {}> = dispatch => ({
    search: query => dispatch(updateTicker(query)),
    updateChartRange: range => dispatch(updateChartRange(range)),
    updateChartPrices: prices => dispatch(updateChartData(prices)),
    callbacks: {
        company: company => dispatch(updateCompany(company)),
        quote: quote => dispatch(updateKeyStats(quote)),
        news: news => dispatch(updateNews(news)),
        peers: peers => dispatch(updatePeers(peers)),
        favorites: prices => dispatch(updateFavoritesData(prices))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);