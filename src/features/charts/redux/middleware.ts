import { Middleware } from 'redux'
import { UPDATE_CHART_RANGE } from '../redux'
import { AppState, MiddlewareDependencies } from 'models'

export const chartMiddleware = ({socketService}: MiddlewareDependencies): Middleware<{}, AppState> => {
    return ({getState}) => {
        return (next) => (action) => {
            const socket = socketService.get()
            if (action.type === UPDATE_CHART_RANGE) {
                const ticker = getState().search
                socket.emit('chart', [ticker, action.payload])
            }

            return next(action)
        }
    }
}