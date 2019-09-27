import * as actionTypes from './actionTypes';

export const search = ticker => ({
    type: actionTypes.UPDATE_TICKER,
    payload: {
        ticker,
    }
});

export const updateCompanyOverview = payload => ({
    type: actionTypes.UPDATE_COMPANY,
    payload
});

export const updateKeyStats = payload => ({
    type: actionTypes.UPDATE_KEY_STATS,
    payload,
})

export const updateNews = payload => ({
    type: actionTypes.UPDATE_NEWS,
    payload,
})

export const updatePeers = payload => ({
    type: actionTypes.UPDATE_PEERS,
    payload,
})

export const updateChartRange = payload => ({
    type: actionTypes.UPDATE_CHART_RANGE,
    payload,
})

export const updateChartData = payload => ({
    type: actionTypes.UPDATE_CHART_DATA,
    payload,
})