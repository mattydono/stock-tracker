import React, { useEffect } from 'react';
import Search from './search';
import CompanyOverview from './companyOverview.js';
import KeyStats from './keystats';

import { 
    updateCompanyOverview, 
    search,
    updateKeyStats,
} from '../redux/actions';

import { connect } from 'react-redux';

import StockAPI from '../utils/stockAPI';
const stockAPI = new StockAPI();

const Root = ({ ticker, companyOverview, keyStats, search, company, quote }) => {

    useEffect(() => {
        stockAPI.subscribeToCompany(ticker, company);
        stockAPI.subscribeToQuote(ticker, quote);
        return () => {
            stockAPI.unsubscribeToCompany(ticker);
            stockAPI.unsubscribeToQuote(ticker, quote);
        }
    }, [ticker]);

    console.log(keyStats)

    return (
        <div>
            <Search search={search} />
            <CompanyOverview {...companyOverview} />
            <KeyStats {...keyStats} />
        </div>
    )
}

const mapStateToProps = state => ({
    companyOverview: state.companyOverview,
    ticker: state.search,
    keyStats: state.keyStats,
})

const mapDispatchToProps = dispatch => ({
    search: query => dispatch(search(query)),
    company: company => dispatch(updateCompanyOverview(company)),
    quote: q => dispatch(updateKeyStats(q)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);