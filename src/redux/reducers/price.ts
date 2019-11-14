import { isActionOf } from 'typesafe-actions'
import { Reducer } from 'redux'
import { Prices } from 'models/prices'
import { updatePricesData } from 'redux/actions'

const pricesInitialState: Prices = [{ ticker: 'aapl', change: 0, changePercent: 0, latestPrice: 0, error: false }]

export const prices: Reducer<Readonly<Prices>> = (
    state = pricesInitialState,
    action
    ) => {
        if (isActionOf(updatePricesData, action)) {
            return action.payload
        }

        return state
}