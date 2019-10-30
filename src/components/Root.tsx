import React from 'react';
import { MapDispatchToProps, MapStateToProps } from 'react-redux'
import { _StateProps, _DispatchProps } from '../models/props'
import Search from './search/Search';
import CompanyOverview from './companyOverview/Company_Overview';
import KeyStats from './keystats/Key_Stats';
import News from './news/News';
import Peers from './peers/Peers';
import Chart from './charts/Chart';
import Header from './header/Header';
import Footer from './footer/Footer';
import logo from '../components/header/logo.png'

import { resetState } from '../redux/actions/reset_app'
import { updateChartRange, updateChartData } from '../components/charts/redux/actions/actions'
import { updateTicker } from '../components/search/redux/actions/actions'

import { _CompanyOverview } from '../components/companyOverview/models/companyOverview'
import { _KeyStats } from '../components/keystats/models/keyStats'
import { _Charts } from '../components/charts/models/charts'
import { _News } from '../components/news/models/news'
import { _Prices } from '../models/prices'

import { connect } from 'react-redux';

import styled from '@emotion/styled'

export const Title =styled.div`
    border-bottom: 2px solid #7fb3ff;
    width: 100%;
    padding-bottom: 2px;
    margin-bottom: 10px;
    color: #7fb3ff;
    font-weight: 700;
    font-size: 16px;
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
`

const AppContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
    max-width: 1368px;
    // max-height: 1100px;
`

const CompanyContainer = styled.div`
    display: flex;
    flex: 0 1 37%;
    margin-left: 53px;
    flex-direction: column;
    @media(min-width: 750px) {
        min-width: 250px;
    };
    @media(max-width: 750px) {
        margin-left: 0;
    };
`

const ChartNews = styled.div`
    display: flex;
    flex: 1 0 auto;
    margin-bottom: -120px;
    margin-top: 40px;
    @media(max-height: 1100px) {
        margin-bottom: -100px;
    }
    @media(max-width: 1000px) {
        margin-bottom: -90px;
    };
    @media(max-width: 750px) {
        flex-direction: column;
        margin-bottom: 20px;
    };
    @media(min-width: 750px) {
        min-width: 721px;
        min-height: 602px;
    };
    @media(min-width: 1200px) {
        min-width: 1065px;
    };
    @media(min-width: 1500px) {
        min-width: 1335px;
    };
`

const StatsCompany = styled.div`
    display: flex;
    flex: 1 0 auto;
    @media(max-width: 750px) {
        flex-direction: column;
    };
    @media(min-width: 750px) {
        min-width: 721px;
        min-height: 367px;
    };
    @media(min-width: 1200px) {
        min-width: 1065px;
    };
    @media(min-width: 1500px) {
        min-width: 1335px;    
    };
`

const FooterLogo = styled.img`
    height: 40px;
    width: 100px;
    margin-left: 60%;
    @media(min-width: 375px) {
        display: none;
    }
`
interface _AppState {
    search: string,
    companyOverview: _CompanyOverview,
    keyStats: _KeyStats,
    charts: _Charts,
    news: _News,
    peers: string[],
    favorites: string[],
    prices: _Prices,
}

const Root: React.FC<_StateProps & _DispatchProps> = ({ 
    peers, 
    companyOverview, 
    keyStats,
    search, 
    news,
    chartProps,
    footerProps,
    updateChartRange,
    updateChartPrices,
    searchProps,
}) => {

    return (
        <RootContainer>
            <AppContainer>
                <Header />
                <Search 
                search={search} 
                errorQuote={{message: ''}}
                {...searchProps}
                />
                <ChartNews>
                    <Chart 
                        {...chartProps}
                        updateChartPrices={updateChartPrices} 
                        updateChartRange={updateChartRange}
                    />
                    <News errorNews={{message: ''}} isFetchingNews={false} news={news}/>
                </ChartNews>
                <StatsCompany>
                    <KeyStats errorQuote={{message: ''}} isFetchingQuote={false} {...keyStats}/>
                    <CompanyContainer>
                        <CompanyOverview errorCompany={{message: ''}} isFetchingCompany={false} {...companyOverview} />
                        <Peers errorPeers={{message: ''}} isFetchingPeers={false} peers={peers} />
                    </CompanyContainer>
                </StatsCompany>
            </AppContainer>
            <Footer {...footerProps} />
            <FooterLogo src={logo} />
        </RootContainer>
    )
}

const mapStateToProps: MapStateToProps<_StateProps, {}, _AppState> = state => {
    const { companyOverview, search, keyStats, news, peers, favorites, prices, charts } = state;
    const { isUSMarketOpen, primaryExchange, latestTime } = keyStats;
    const { tags } = companyOverview;
    const { range, prices: chartPrices } = charts;
    const price = prices.filter(({ ticker }) => ticker === search)[0] || prices[0];

    const { ticker, latestPrice: latest } = price;

    const footerProps = { prices, favorites };
    const searchProps = { primaryExchange, latestTime, isUSMarketOpen, tags, favorites, price };
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
        footerProps,
        searchProps,
        chartProps
    })
}

const mapDispatchToProps: MapDispatchToProps<_DispatchProps, {}> = dispatch => ({
    search: query => dispatch(updateTicker(query)),
    updateChartRange: range => dispatch(updateChartRange(range)),
    updateChartPrices: prices => dispatch(updateChartData(prices)),
    resetState: () => dispatch(resetState(undefined)),
})

// company: company => dispatch(updateCompany(company)),
//         quote: quote => dispatch(updateKeyStats(quote)),
//         news: news => dispatch(updateNews(news)),
//         peers: peers => dispatch(updatePeers(peers)),

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);