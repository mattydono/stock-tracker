import { Middleware } from 'redux'
import { AppState, MiddlewareDependencies } from 'models'
import { isActionOf } from 'typesafe-actions'
import { updateChartRange } from './actions'

export const chartMiddleware = ({socketService}: MiddlewareDependencies): Middleware<{}, AppState> => {
    return ({getState}) => {
        return (next) => (action) => {
            const socket = socketService.get()
            if (isActionOf(updateChartRange, action)) {
                const ticker = getState().search
                socket.emit('chart', [ticker, action.payload])
            }

            return next(action)
        }
    }
}