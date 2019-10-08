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
import { css, Global } from '@emotion/core';

import { connect } from 'react-redux';

import StockAPI from '../utils/stockAPI';

const RootContainer = styled.div`
    display: grid;
    // grid-template-columns: 5% 22.5% 22.5% 22.5% 22.5% 5%;
    grid-template-rows: auto;
    grid-template-areas: '. Header Header Header Header .' '. Search Search Search Search .' '. Chart Chart Chart News .' '. Stats Stats Stats Company .' '. Footer Footer Footer Footer .';
    font-family: sans-serif;
    color: white;
    height: 100%;
    width: 100%;
    @media (max-width: 800px) {
        // grid-template-columns: 5% 21.25% 21.25% 21.25% 21.25% 5% 5%;
        grid-template-areas: '. Header Header Header Header .' '. Search Search Search Search .' '. Chart Chart Chart Chart .' '. Stats Stats Stats Stats .' '. News News News News .' '. Company Company Company Company .' '. Footer Footer Footer Footer .';
    }
`

const FooterHolder = styled.div`
    grid-area: Footer;
    color: green;
`

const CompanyContainer = styled.div`
    grid-area: Company;
    display: flex;
    flex-direction: column;
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

    const { isUSMarketOpen, latestPrice } = keyStats;

    useEffect(() => {
        stockAPI.subscribeToTicker(ticker, callbacks);
        return () => {
            stockAPI.unsubscribeToTicker(ticker);
        }
    }, [ticker, callbacks]);

    return (
        <RootContainer>
            <Global styles={css`body {
                margin: 0;
                background: no-repeat;
                background-image: linear-gradient(to bottom right, #001f4b, #01142f);};
                `
            } />
            <Header />
            <Search 
            search={search} 
            {...keyStats} 
            {...companyOverview}
            />
            <Chart 
                {...chart} 
                ticker={ticker} 
                open={isUSMarketOpen} 
                latest={latestPrice} 
                updateChartPrices={updateChartPrices} 
                updateChartRange={updateChartRange} 
            />
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