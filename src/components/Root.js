import React, { useEffect } from 'react';
import Search from './search';
import CompanyOverview from './companyOverview.js';

import { updateCompanyOverview, search } from '../redux/actions';

import { connect } from 'react-redux';

import StockAPI from '../utils/stockAPI';
const stockAPI = new StockAPI();

const Root = ({ ticker, search, companyOverview, company }) => {

    useEffect(() => {
        stockAPI.subscribeToCompany(ticker, company)
        return () => {
            stockAPI.unsubscribeToCompany(ticker);
        }
    }, [ticker]);

    return (
        <div>
            <Search search={search} />
            <CompanyOverview {...companyOverview} />
        </div>
    )
}

const mapStateToProps = state => ({
    companyOverview: state.companyOverview,
    ticker: state.search,
})

const mapDispatchToProps = dispatch => ({
    search: query => dispatch(search(query)),
    company: company => dispatch(updateCompanyOverview(company)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);