import { UpdateKeyStatsAction, UPDATE_KEY_STATS } from '../actions/actions'
import { _KeyStats } from '../../models/keyStats'
import { RESET_APP_STATE } from '../../../../redux/actions/resetApp'

const keyStatsInitialState: _KeyStats = {
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

export const keyStats = (
    state = keyStatsInitialState, 
    action: UpdateKeyStatsAction
    ) => {
    switch (action.type) {
        case UPDATE_KEY_STATS: {
            const updateKeyStatsAction = action as UpdateKeyStatsAction 
            const { payload } = updateKeyStatsAction;
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