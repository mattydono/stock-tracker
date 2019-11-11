import { Middleware, AnyAction } from 'redux'
import { UPDATE_CHART_RANGE } from '../redux'

export const chartMiddleware = (socket: SocketIOClient.Socket): Middleware => {
    return ({getState}) => {
        return (next) => (action: AnyAction) => {
            if (action.type === UPDATE_CHART_RANGE) {
                const { search: ticker } = getState();
                socket.emit('chart', [ticker, action.payload])
            }

            return next(action)
        }
    }
}