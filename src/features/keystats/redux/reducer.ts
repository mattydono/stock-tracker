import { isActionOf } from 'typesafe-actions'
import { KeyStats } from '../models'
import { stockChange } from 'redux/actions/stockChange'
import { Reducer } from 'redux'
import { updateKeyStats } from './actions'

const keyStatsInitialState: KeyStats = {
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null,
    avgTotalVolume: null,
    previousClose: null,
    low: null,
    high: null,
    volume: null,
    open: null,
    dividendYield: null,
    actualEPS: null,
    primaryExchange: null,
    latestTime: null,
    isUSMarketOpen: false,
    isFetchingQuote: false,
}

export const keyStats: Reducer<Readonly<KeyStats>> = (
    state = keyStatsInitialState, 
    action
    ) => {
        if (isActionOf(updateKeyStats, action)) {
            return ({ ...state, ...action.payload });
        }

        if (isActionOf(stockChange, action)) {
            return keyStatsInitialState
        }

        return state
}