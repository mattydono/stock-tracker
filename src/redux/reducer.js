import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const companyOverviewInitialState = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: []
}

const search = (state = '', action) => {
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
            return ({ ...state, ...payload });
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    search,
    companyOverview
})