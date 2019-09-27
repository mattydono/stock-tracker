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
import styled from '@emotion/styled';

import { connect } from 'react-redux';

import StockAPI from '../utils/stockAPI';

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row
`

const ColumnContainer = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
`

const ChartHolder = styled.div`
    width: 50%;
    height: 60vh;
`

const FooterHolder = styled.div`
    width: 100%;
    height: 10vh;
`

const stockAPI = new StockAPI();

const Root = ({ ticker, peers, companyOverview, keyStats, callbacks, search, news }) => {

    console.log(keyStats)

    useEffect(() => {
        stockAPI.subscribeToTicker(ticker, callbacks);
        return () => {
            stockAPI.unsubscribeToTicker(ticker);
        }
    }, [ticker]);

    return (
        <RootContainer>
            <Search search={search} />
            <RowContainer>
                <ChartHolder>CHART HERE</ChartHolder>
                <News news ={news}/>
            </RowContainer>
            <RowContainer>
                <KeyStats {...keyStats} search={search}/>
                    <ColumnContainer>
                        <CompanyOverview {...companyOverview} />
                        <Peers peers={peers} />
                    </ColumnContainer>
            </RowContainer>
            <FooterHolder>FOOTER</FooterHolder>
        </RootContainer>
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