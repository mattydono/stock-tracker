import { Reducer } from 'redux';
import { UpdateTickerAction, UPDATE_TICKER, UpdateStockListAction, SET_STOCKLIST } from './actions';
import { StockListItem } from '../models';

export const search: Reducer<string, UpdateTickerAction> = (
    state = 'aapl', 
    action
) => {
    const { type, payload } = action
    switch(type) {
        case UPDATE_TICKER: {
            return payload;
        }
        default: {
            return state;
        }
    }
};

export const stockList: Reducer<StockListItem[], UpdateStockListAction> = (state = [], action) => {
    switch(action.type) {
        case SET_STOCKLIST: {
            return action.payload
        }
        default: {
            return state
        }
    }
}