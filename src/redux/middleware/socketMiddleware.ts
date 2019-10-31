import { socketService } from '../services/socket-service'

import { _PriceSingleDataPoint } from '../../models/prices'
import { _CompanyOverview } from '../../components/companyOverview/models/companyOverview'
import { _News } from '../../components/news/models/news'
import { _KeyStats } from '../../components/keystats/models/keyStats'
import { _Error } from '../../models/errors'

import { AnyAction, Dispatch, MiddlewareAPI } from 'redux'

const socketMiddleware = () => {
    const socket = socketService.get();

    return ({ dispatch, getState }: MiddlewareAPI) => {

        socket.emit('ticker', 'aapl')
        socket.emit('prices', ['aapl', 'amzn', 'msft', 'fb'])

        socket.on('prices', (prices: _PriceSingleDataPoint[]) => dispatch({ type: 'UPDATE_PRICES_DATA', payload: prices }));
        socket.on('company', (company: _CompanyOverview) => dispatch({ type: 'UPDATE_COMPANY', payload: company }));
        socket.on('news', (news: _News) => dispatch({ type: 'UPDATE_NEWS', payload: news }));
        socket.on('keystats', (keystats: _KeyStats) => dispatch({ type: 'UPDATE_KEY_STATS', payload: keystats }));
        socket.on('error', (error: string) => dispatch({type: 'ERROR', payload: error}))        
        
        return (next: Dispatch) => (action: AnyAction) => {
            if (typeof action === 'function') {
                return next(action);
            }

            if (action.type === 'UPDATE_TICKER') {
                const { favorites } = getState();
                const { payload } = action;
                const tickerPlusFavorites = Array.from(new Set([...favorites, payload]));
                dispatch({ type: 'RESET_APP_STATE' })
                socket.emit('prices', tickerPlusFavorites);
                socket.emit('ticker', action.payload);
                next(action);
            }
    
            const {
                event,
                emit,
                payload,
            } = action;
    
            if (!event) return next(action);
    
            if (emit) {
                socket.emit(event, payload);
                return;
            }
        }
    }
}

export default socketMiddleware;