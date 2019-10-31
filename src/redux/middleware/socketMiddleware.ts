import { socketService } from '../../services/socket-service'

import { _PriceSingleDataPoint } from '../../models/prices'
import { _CompanyOverview } from '../../features/companyOverview/models/companyOverview'
import { _News } from '../../features/news/models/news'
import { _KeyStats } from '../../features/keystats/models/keyStats'
import { _Error } from '../../models/errors'

import { AnyAction, Dispatch, MiddlewareAPI } from 'redux'

const socketMiddleware = () => {
    const socket = socketService.get();

    return ({ dispatch, getState }: MiddlewareAPI) => {

        socket.on('prices', (prices: _PriceSingleDataPoint[]) => dispatch({ type: 'UPDATE_PRICES_DATA', payload: prices }));
        socket.on('company', (company: _CompanyOverview) => dispatch({ type: 'UPDATE_COMPANY', payload: company }));
        socket.on('news', (news: _News) => dispatch({ type: 'UPDATE_NEWS', payload: news }));
        socket.on('keystats', (keystats: _KeyStats) => dispatch({ type: 'UPDATE_KEY_STATS', payload: keystats }));
        socket.on('error', (error: string) => dispatch({type: 'ERROR', payload: error})) 
        
        socket.emit('ticker', 'aapl')
        socket.emit('prices', ['aapl', 'amzn', 'msft', 'fb'])
        
        return (next: Dispatch) => (action: AnyAction) => {

            if (action.type === 'UPDATE_TICKER') {
                const { favorites } = getState();
                const { payload } = action;
                const tickerPlusFavorites = Array.from(new Set([...favorites, payload]));
                dispatch({ type: 'RESET_APP_STATE' })
                socket.emit('prices', tickerPlusFavorites);
                socket.emit('ticker', action.payload);
            }
    
            return next(action)
        }
    }
}

export default socketMiddleware;