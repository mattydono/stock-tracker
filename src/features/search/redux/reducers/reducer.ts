import { UpdateTickerAction, UPDATE_TICKER } from '../actions/actions'
import { Reducer } from 'redux';

export const search: Reducer<string, UpdateTickerAction> = (
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