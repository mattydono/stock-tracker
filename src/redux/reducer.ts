import { combineReducers, Reducer } from 'redux';
import { UpdateTickerAction, UPDATE_TICKER, 
        UpdateKeyStatsAction, UPDATE_KEY_STATS, 
        UpdateChartDataAction, UPDATE_CHART_DATA, 
        UpdateChartRangeAction, UPDATE_CHART_RANGE, 
        UpdateCompanyAction, UPDATE_COMPANY, 
        UpdateNewsAction, UPDATE_NEWS, 
        UpdatePeersAction, UPDATE_PEERS } from './actions'
import { _CompanyOverview, _KeyStats, _Charts, _News } from '../models'

export interface _AppState {
    search: string,
    companyOverview: _CompanyOverview,
    keyStats: _KeyStats,
    charts: _Charts,
    news: _News,
    peers: string[]
}

const companyOverviewInitialState: _CompanyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: []
}

const keyStatsInitialState: _KeyStats = {
    symbol: null,
    companyName: null,
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null,
    avgTotalVolume: null,
    previousClose: null,
    low: null,
    high: null,
    volume: null,
    open: null,
    dividendYield: null,
    actualEPS: null,
    change: null,
    changePercent: null,
    latestPrice: null,
    primaryExchange: null,
    latestTime: null,
    isUSMarketOpen: null
}

const chartsIntitialState: _Charts = {
    range: '1m',
    prices: [],
}

const newsInitialState: _News = []

const search: Reducer<string, UpdateTickerAction> = (
    state = 'aapl', 
    action
) => {
    switch(action.type) {
        case UPDATE_TICKER: {
            const updateTickerAction = action as UpdateTickerAction
            const { payload } = updateTickerAction;
            return payload;
        }
        default: {
            return state;
        }
    }
};

const companyOverview = (
    state = companyOverviewInitialState, 
    action: UpdateCompanyAction
    ) => {
    switch (action.type) {
        case UPDATE_COMPANY: {
            const updateCompanyAction = action as UpdateCompanyAction
            const { payload } = updateCompanyAction;
            return payload;
        }
        default: {
            return state;
        }
    }
}

const keyStats = (
    state = keyStatsInitialState, 
    action: UpdateKeyStatsAction
    ) => {
    switch (action.type) {
        case UPDATE_KEY_STATS: {
            const updateKeyStatsAction = action as UpdateKeyStatsAction 
            const { payload } = updateKeyStatsAction;
            return ({ ...state, ...payload });
        }
        default: {
            return state;
        }
    }
}

const news = (
    state = newsInitialState,
    action: UpdateNewsAction
    ) => {
    switch (action.type) {
        case UPDATE_NEWS: {
            const updateNewsAction = action as UpdateNewsAction
            const { payload } = updateNewsAction;
            return payload;
        }
        default: {
            return state;
        }
    }
}

const peers = (
    state = [''],
    action: UpdatePeersAction
    ) => {
    switch (action.type) {
        case UPDATE_PEERS: {
            const updatePeersAction = action as UpdatePeersAction
            const { payload } = updatePeersAction;
            return [
                ...state,
                ...payload
            ]
        }
        default: {
            return state;
        }
    }
}

const charts = (
    state = chartsIntitialState, 
    action: UpdateChartDataAction | UpdateChartRangeAction
    ) => {
    switch (action.type) {
        case UPDATE_CHART_RANGE: {
            const updateChartRangeAction = action as UpdateChartRangeAction
            const { payload } = updateChartRangeAction;
            return ({ ...state, range: payload })
        }
        case UPDATE_CHART_DATA: {
            const updateChartDataAction = action as UpdateChartDataAction
            const { payload } = updateChartDataAction;
            return ({ ...state, prices: payload });
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    search,
    companyOverview,
    keyStats,
    news,
    peers,
    charts,
})