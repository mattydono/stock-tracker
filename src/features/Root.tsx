import React from 'react';
import { MapDispatchToProps, MapStateToProps } from 'react-redux'
import { StateProps, DispatchProps } from '../models/props'
import Search from './search/Search';
import CompanyOverview from './companyOverview';
import KeyStats from './keystats';
import News from './news';
import Peers from './peers/Peers';
import Chart from './charts';
import Header from './header/Header';
import Footer from './footer';

import { resetState } from '../redux/actions/resetApp'
import { updateChartRange, updateChartData } from './charts/redux/actions'
import { updateTicker } from './search/redux/actions'

import { AppState } from '../models/appState';

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

const ChartNewsLayout = styled.div`
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

const StatsCompanyLayout = styled.div`
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

const Root: React.FC<StateProps & DispatchProps> = ({ 
    peers, 
    companyOverview, 
    keyStats,
    search, 
    news,
    footerProps,
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
                <ChartNewsLayout>
                    <Chart />
                    <News />
                </ChartNewsLayout>
                <StatsCompanyLayout>
                    <KeyStats />
                    <CompanyContainer>
                        <CompanyOverview />
                        <Peers errorPeers={{message: ''}} isFetchingPeers={false} peers={peers} />
                    </CompanyContainer>
                </StatsCompanyLayout>
            </AppContainer>
            <Footer />
        </RootContainer>
    )
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => {
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

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    search: query => dispatch(updateTicker(query)),
    updateChartRange: range => dispatch(updateChartRange(range)),
    updateChartPrices: prices => dispatch(updateChartData(prices)),
    resetState: () => dispatch(resetState(undefined)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);