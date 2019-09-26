import React, { useEffect } from 'react';
import Search from './search';
import CompanyOverview from './companyOverview.js';
import KeyStats from './keystats';
import News from './news';
import Peers from './peers';

import { 
    updateCompanyOverview, 
    search,
    updateKeyStats,
    updateNews,
    updatePeers
} from '../redux/actions';

import { connect } from 'react-redux';

import StockAPI from '../utils/stockAPI';
const stockAPI = new StockAPI();

const Root = ({ ticker, peers, companyOverview, keyStats, callbacks, search, news }) => {

    useEffect(() => {
        stockAPI.subscribeToTicker(ticker, callbacks);
        return () => {
            stockAPI.unsubscribeToTicker(ticker);
        }
    }, [ticker]);

    return (
        <div>
            <Search search={search} />
            <CompanyOverview {...companyOverview} />
            <KeyStats {...keyStats} />
            <News news={news} />
            <Peers peers={peers} />
        </div>
    )
}

const mapStateToProps = state => ({
    companyOverview: state.companyOverview,
    ticker: state.search,
    keyStats: state.keyStats,
    news: state.news,
    peers: state.peers,
})

const mapDispatchToProps = dispatch => ({
    search: query => dispatch(search(query)),
    callbacks: {
        company: company => dispatch(updateCompanyOverview(company)),
        quote: quote => dispatch(updateKeyStats(quote)),
        news: news => dispatch(updateNews(news)),
        peers: peers => dispatch(updatePeers(peers)),
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);