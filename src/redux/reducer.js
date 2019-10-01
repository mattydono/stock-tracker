import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const companyOverviewInitialState = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: []
}

const keyStatsInitialState = {
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

const search = (state = 'aapl', action) => {
    switch(action.type) {
        case actionTypes.UPDATE_TICKER: {
            const { ticker } = action.payload;
            return ticker;
        }
        default: {
            return state;
        }
    }
};

const companyOverview = (state = companyOverviewInitialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_COMPANY: {
            const { payload } = action;
            return payload;
        }
        default: {
            return state;
        }
    }
}

const keyStats = (state = keyStatsInitialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_KEY_STATS: {
            const { payload } = action;
            return ({ ...state, ...payload });
        }
        default: {
            return state;
        }
    }
}

const news = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_NEWS': {
            const { payload } = action;
            return payload;
        }
        default: {
            return state;
        }
    }
}

const peers = (state = [''], action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PEERS: {
            const { payload } = action;
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

const charts = (state = chartsIntitialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CHART_RANGE: {
            const { payload } = action;
            return ({ ...state, range: payload })
        }
        case actionTypes.UPDATE_CHART_DATA: {
            const { payload } = action;
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