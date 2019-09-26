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