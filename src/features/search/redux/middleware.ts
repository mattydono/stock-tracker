import { AppState, MiddlewareDependencies } from 'models'
import { Middleware } from 'redux'
import { stockChange } from 'redux/actions/stockChange'
import { isActionOf } from 'typesafe-actions'
import { updateTicker, updateQuery, updateStockList } from './actions'

export const searchMiddleware = ({ socketService }: MiddlewareDependencies): Middleware<{}, AppState> => {
    return ({ dispatch, getState }) => {
        return (next) => (action) => {
            const socket = socketService.get()
            if (isActionOf(updateTicker, action)) {
                const { favorites, charts: { range } } = getState();
                const tickerPlusFavorites = Array.from(new Set([...favorites, action.payload]));
                dispatch(stockChange())
                socket.emit('prices', tickerPlusFavorites);
                socket.emit('ticker', action.payload);
                socket.emit('chart', [action.payload, range])
            }

            if (isActionOf(updateQuery, action)) {
                if (action.payload === '') dispatch(updateStockList([]))
                socket.emit('search', action.payload)
            }

            return next(action)
        }
    }
}