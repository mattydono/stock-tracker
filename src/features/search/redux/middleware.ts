import { AppState, MiddlewareDependencies } from 'models'
import { Middleware } from 'redux'
import { stockChange } from 'redux/actions/stockChange'
import { isActionOf } from 'typesafe-actions'
import { updateTicker } from './actions'

export const searchMiddleware = ({ socket }: MiddlewareDependencies): Middleware<{}, AppState> => {
    return ({ dispatch, getState }) => {
        return (next) => (action) => {
            const Socket = socket.get()
            if (isActionOf(updateTicker, action)) {
                const { favorites, charts: { range } } = getState();
                const tickerPlusFavorites = Array.from(new Set([...favorites, action.payload]));
                dispatch(stockChange())
                Socket.emit('prices', tickerPlusFavorites);
                Socket.emit('ticker', action.payload);
                Socket.emit('chart', [action.payload, range])
            }

            return next(action)
        }
    }
}