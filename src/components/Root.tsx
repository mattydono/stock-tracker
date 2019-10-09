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
import useTicker from '../redux/hooks';

import './root.css'

import {
    updateTicker,
    updateCompany,
    updateKeyStats,
    updateNews,
    updatePeers,
    updateChartRange,
    updateChartData
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
    chart,
    updateChartRange,
    updateChartPrices,
}) => {

    const { isUSMarketOpen, latestPrice } = keyStats;

    const [updateTicker, errors, fetching]:any = useTicker(ticker, callbacks);

    useEffect(() => {
        updateTicker(ticker);
    }, [ticker])

    return (
        <div className='RootContainer'>
            <div className='AppContainer'>
                <Header />
                <Search 
                search={search} 
                {...keyStats} 
                {...companyOverview}
                />
                <div className='ChartNews'>
                    <Chart 
                        {...chart} 
                        ticker={ticker} 
                        open={isUSMarketOpen} 
                        latest={latestPrice} 
                        updateChartPrices={updateChartPrices} 
                        updateChartRange={updateChartRange} 
                    />
                    <News news ={news}/>
                </div>
                <div className='StatsCompany'>
                    <KeyStats {...keyStats}/>
                    <div className='CompanyContainer'>
                        <CompanyOverview {...companyOverview} />
                        <Peers peers={peers} />
                    </div>
                </div>
            </div>
            <div className='FooterHolder'>FOOTER</div>
        </div>
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