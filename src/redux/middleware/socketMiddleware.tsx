import { socketService } from '../services/socket-service'

const socketMiddleware = () => {
    const socket = socketService.get();

    return ({ dispatch, getState }: any) => {
        socket.on('prices', (prices: any) => dispatch({ type: 'UPDATE_PRICES_DATA', payload: prices }));
        socket.on('company', (company: any) => dispatch({ type: 'UPDATE_COMPANY', payload: company }));
        socket.on('news', (news: any) => dispatch({ type: 'UPDATE_NEWS', payload: news }));
        socket.on('keystats', (keystats: any) => dispatch({ type: 'UPDATE_KEY_STATS', payload: keystats }));        
        
        return (next: any) => (action: any) => {
            if (typeof action === 'function') {
                return next(action);
            }

            if (action.type === 'UPDATE_TICKER') {
                const { favorites, search } = getState()
                const tickerPlusFavorites = Array.from(new Set([...favorites, search]));
                dispatch({ type: 'RESET_APP_STATE' })
                socket.emit('prices', tickerPlusFavorites);
                socket.emit('ticker', action.payload);
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