import { searchMiddleware } from './middleware'
import {  updateTicker, updateQuery } from './actions'

describe('Testing Chart middleware', () => {
    let mockSocket: any;
    let socketService: any;
    let store: any;
    let next: jest.Mock;

    beforeEach(() => {
        mockSocket = {
            emit: jest.fn()
        };

        socketService = {
            get: () => mockSocket
        }

        const state = { favorites: ['AMZN', 'MSFT', 'GOOG'], charts: { range: '1m'} };

        store = {
            getState: jest.fn(() => state),
            dispatch: jest.fn()
        }

        next = jest.fn();
    })

    it('should call dispatch with createAction stockChange', () => {
        const action = updateTicker('aapl');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(store.dispatch).toBeCalledWith({type: 'STOCK_CHANGE'});
    })

    it('should emit with action: UPDATE_TICKER, event: chart, & payload: [aapl, 1m]', () => {
        const action = updateTicker('aapl');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('chart', ['aapl', '1m']);
    })

    it('should emit with action: UPDATE_TICKER, event: ticker, & payload: aapl', () => {
        const action = updateTicker('aapl');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('ticker', 'aapl');
    })

    it('should emit with action: UPDATE_TICKER, event: prices, & payload: [AMZN, MSFT, GOOG, aapl]', () => {
        const action = updateTicker('aapl');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('prices', ['AMZN', 'MSFT', 'GOOG', 'aapl']);
    })

    it('should call dispatch with createAction updateStockList if stocklist === \'\'', () => {
        const action = updateQuery('');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(store.dispatch).toBeCalledWith({type: 'UPDATE_STOCKLIST', payload: []});
    })

    it('should not call dispatch with createAction updateStockList if stocklist !== \'\'', () => {
        const action = updateQuery('aapl');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(store.dispatch).not.toBeCalledWith({type: 'UPDATE_STOCKLIST', payload: []});
    })
    
    it('should emit with action: UPDATE_QUERY, event: search,  & payload: [AMZN, MSFT, GOOG, aapl]', () => {
        const action = updateQuery('aapl');
        const middleware = searchMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('search', 'aapl');
    })
})