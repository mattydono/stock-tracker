import { Reducer } from 'redux';
import { isActionOf } from 'typesafe-actions';
import { Search } from '../models';
import { updateStockList, updateTicker } from './actions';

const searchInitialState: Search = {
    ticker: 'aapl',
    stockList: [],
}

export const search: Reducer<Search> = (
    state = searchInitialState,
    action
) => {
    if (isActionOf(updateTicker, action)) {
        return { ...state, ticker: action.payload };
    }

    if (isActionOf(updateStockList, action)) {
        return { ...state, stockList: action.payload }
    }

    return state;
};
