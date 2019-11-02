import { UpdatePricesDataAction, UPDATE_PRICES_DATA } from '../actions/price'
import { _Prices } from '../../models/prices'

const pricesInitialState: _Prices = [{ ticker: 'aapl', change: 0, changePercent: 0, latestPrice: 0, error: false }]

export const prices = (state = pricesInitialState, action: UpdatePricesDataAction) => {
    switch (action.type) {
        case UPDATE_PRICES_DATA: {
            return (action as UpdatePricesDataAction).payload;
        }
        default: {
            return state;
        }
    }
}