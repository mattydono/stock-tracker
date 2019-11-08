import { UpdateKeyStatsAction, UPDATE_KEY_STATS } from './actions'
import { KeyStats } from '../models'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'
import { Reducer } from 'redux'

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

export const keyStats: Reducer<KeyStats, UpdateKeyStatsAction> = (
    state = keyStatsInitialState, 
    action
    ) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE_KEY_STATS: {
            return ({ ...state, ...payload });
        }
        case RESET_APP_STATE: {
            return keyStatsInitialState
        }
        default: {
            return state;
        }
    }
}