import { Reducer } from 'redux';
import { UpdateTickerAction, UPDATE_TICKER, UpdateStockListAction, SET_STOCKLIST, updateTicker } from './actions';
import { Search } from '../models';

const searchInitialState: Search = {
    ticker: 'aapl',
    stockList: [],
}

type SearchActionTypes = UpdateTickerAction | UpdateStockListAction

export const search: Reducer<Search, SearchActionTypes> = (
    state = searchInitialState, 
    action
) => {
    switch(action.type) {
        case UPDATE_TICKER: {
            const updateTickerAction = action as UpdateTickerAction
            const { payload } = updateTickerAction
            return {...state, ticker: payload};
        }
        case SET_STOCKLIST: {
            const updateStockListAction = action as UpdateStockListAction
            const { payload } = updateStockListAction 
            return {...state, stockList: payload}
        }
        default: {
            return state;
        }
    }
};
