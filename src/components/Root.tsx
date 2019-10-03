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
import Header from './header'

// import { 
//     updateCompanyOverview, 
//     search,
//     updateKeyStats,
//     updateNews,
//     updatePeers,
//     updateChartRange,
//     updateChartData,
// } from '../redux/actions';

import {
    updateTicker,
    updateCompany,
    updateKeyStats,
    updateNews,
    updatePeers,
    updateChartRange,
    updateChartData
} from '../redux/actions'

import styled from '@emotion/styled';

import { connect } from 'react-redux';

import StockAPI from '../utils/stockAPI';

const RootContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    font-family: sans-serif;
    margin: 0 5% 0 5%;
`

const FooterHolder = styled.div`
    width: 100%;
    height: 10vh;
    background-color: 
`

const CompanyContainer = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    height: 30vh;
`

export const Title = styled.div`
    border-bottom: 2px solid #608fd1;
    width: 95%;
    padding-bottom: 2px;
    margin-bottom: 10px;
    color: #608fd1;
`

const stockAPI = new StockAPI();

const Root: React.FC<_StateProps & _DispatchProps> = ({ 
    ticker, 
    peers, 
    companyOverview, 
    keyStats, 
    callbacks, 
    search, 
    news,
    chart,
    updateChartRange,
    updateChartPrices,
}) => {

    const { range } = chart;

    useEffect(() => {
        stockAPI.subscribeToTicker(ticker, callbacks);
        return () => {
            stockAPI.unsubscribeToTicker(ticker);
        }
    }, [ticker, callbacks]);

    useEffect(() => {
        stockAPI.subscribeToChart(ticker, range, updateChartPrices);
        return () => {
            stockAPI.unsubscribeToChart(ticker);
        }
    }, [range, ticker, updateChartPrices])

    return (
        <RootContainer>
            <Header />
            <Search search={search} {...keyStats} {...companyOverview}/>
            <Chart {...chart} updateChartRange={updateChartRange} />
            <News news ={news}/>
            <KeyStats {...keyStats}/>
            <CompanyContainer>
                <CompanyOverview {...companyOverview} />
                <Peers peers={peers} />
            </CompanyContainer>
            <FooterHolder>FOOTER</FooterHolder>
        </RootContainer>
    )
}

const mapStateToProps: MapStateToProps<_StateProps, {}, _AppState> = state => ({
    companyOverview: state.companyOverview,
    ticker: state.search,
    keyStats: state.keyStats,
    news: state.news,
    peers: state.peers,
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
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);