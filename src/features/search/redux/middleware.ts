import { Middleware, AnyAction } from 'redux'
import { UPDATE_TICKER } from '../redux'
import { resetState } from 'redux/actions'
import { AppState } from 'models'

export const searchMiddleware = (socket: SocketIOClient.Socket): Middleware<AppState> => {
    return ({dispatch, getState}) => {
        return (next) => (action) => {
            const { payload, type } = action
            if (type === UPDATE_TICKER) {
                const { favorites, charts: { range } } = getState();
                const tickerPlusFavorites = Array.from(new Set([...favorites, payload]));
                dispatch(resetState())
                socket.emit('prices', tickerPlusFavorites);
                socket.emit('ticker', payload);
                socket.emit('chart', [payload, range])
            }

            return next(action)
        }
    }
}