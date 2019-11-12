import { Middleware, AnyAction } from 'redux'
import { UPDATE_CHART_RANGE } from '../redux'
import { AppState } from 'models'

export const chartMiddleware = (socket: SocketIOClient.Socket): Middleware<AppState> => {
    return ({getState}) => {
        return (next) => (action) => {
            if (action.type === UPDATE_CHART_RANGE) {
                const { search: ticker } = getState();
                socket.emit('chart', [ticker, action.payload])
            }

            return next(action)
        }
    }
}