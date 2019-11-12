import { Middleware } from 'redux'
import { UPDATE_TICKER } from '../redux'
import {  } from 'redux/actions'
import { AppState, MiddlewareDependencies } from 'models'
import { stockChange } from 'redux/actions/stockChange'

export const searchMiddleware = ({socket}: MiddlewareDependencies): Middleware<AppState> => {
    return ({dispatch, getState}) => {
        return (next) => (action) => {
            const { payload, type } = action
            const Socket = socket.get()
            if (type === UPDATE_TICKER) {
                const { favorites, charts: { range } } = getState();
                const tickerPlusFavorites = Array.from(new Set([...favorites, payload]));
                dispatch(stockChange())
                Socket.emit('prices', tickerPlusFavorites);
                Socket.emit('ticker', payload);
                Socket.emit('chart', [payload, range])
            }

            return next(action)
        }
    }
}