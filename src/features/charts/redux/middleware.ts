import { Middleware } from 'redux'
import { UPDATE_CHART_RANGE } from '../redux'
import { AppState, MiddlewareDependencies } from 'models'

export const chartMiddleware = ({socket}: MiddlewareDependencies): Middleware<{}, AppState> => {
    return ({getState}) => {
        return (next) => (action) => {
            if (action.type === UPDATE_CHART_RANGE) {
                const ticker = getState().search
                socket.get().emit('chart', [ticker, action.payload])
            }

            return next(action)
        }
    }
}