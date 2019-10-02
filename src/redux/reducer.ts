import { combineReducers } from 'redux';
import { UpdateTickerAction, UPDATE_TICKER, 
        UpdateKeyStatsAction, UPDATE_KEY_STATS, 
        UpdateChartDataAction, UPDATE_CHART_DATA, 
        UpdateChartRangeAction, UPDATE_CHART_RANGE, 
        UpdateCompanyAction, UPDATE_COMPANY, 
        UpdateNewsAction, UPDATE_NEWS, 
        UpdatePeersAction, UPDATE_PEERS } from './actionTypes'

interface companyOverview {
    symbol: string | null,
    companyName: string | null,
    website: string | null,
    description: string | null,
    tags: string[]
}

interface keyStats {
    symbol: string | null,
    companyName: string | null,
    marketCap: number | null,
    peRatio: number | null,
    week52High: number | null,
    week52Low: number | null,
    avgTotalVolume: number | null,
}

interface charts {
    range: string,
    prices: []
}

const companyOverviewInitialState: companyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: []
}

const keyStatsInitialState: keyStats = {
    symbol: null,
    companyName: null,
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null,
    avgTotalVolume: null,
}

const chartsIntitialState = {
    range: '1m',
    prices: [],
}

const search = (
    state = 'aapl', 
    action: UpdateTickerAction
    ) => {
    switch(action.type) {
        case UPDATE_TICKER: 
            const updateTickerAction = action as UpdateTickerAction
            const { ticker } = updateTickerAction.payload;
            return ticker;
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
        case UPDATE_COMPANY: 
            const updateCompanyAction = action as UpdateCompanyAction
            const { payload } = updateCompanyAction.payload;
            return payload;
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
        case UPDATE_KEY_STATS:
            const updateKeyStatsAction = action as UpdateKeyStatsAction 
            const { payload } = updateKeyStatsAction.payload;
            return ({ ...state, ...payload });
        default: {
            return state;
        }
    }
}

const news = (
    state = [],
    action: UpdateNewsAction
    ) => {
    switch (action.type) {
        case UPDATE_NEWS: 
            const updateNewsAction = action as UpdateNewsAction
            const { payload } = updateNewsAction.payload;
            return payload;
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
        case UPDATE_PEERS:
            const updatePeersAction = action as UpdatePeersAction
            const { payload } = updatePeersAction.payload;
            return [
                ...state,
                ...payload
            ]
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
        case UPDATE_CHART_RANGE:
            const updateChartRangeAction = action as UpdateChartRangeAction
            const { rangePayload } = updateChartRangeAction.payload;
            return ({ ...state, range: rangePayload })
        case UPDATE_CHART_DATA:
            const updateChartDataAction = action as UpdateChartDataAction
            const { dataPayload } = updateChartDataAction.payload;
            return ({ ...state, prices: dataPayload });
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