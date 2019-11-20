import { initialStartUpMiddleware } from './initialStartUpMiddleware'
import { updatePricesData, bootstrapAction } from 'redux/actions';

jest.mock('services/socketService');

describe('Testing initial start-up middleware', () => {
    let mockSocket: any;
    let socketService: any;
    let store: any;
    let next: jest.Mock;

    beforeEach(() => {
        mockSocket = {
            emit: jest.fn(),
            on: jest.fn()
        };

        socketService = {
            get: () => mockSocket
        }

        const state = { favorites: ['AMZN', 'MSFT', 'GOOG'], charts: { range: '1m'}, search: { ticker: 'aapl' } };

        store = {
            getState: jest.fn(() => state),
            dispatch: jest.fn()
        }

        next = jest.fn();
    })

    it('should call socket.on with prices', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

        expect(mockSocket.on).toBeCalledWith('prices', expect.anything());
    })

    it('should call socket.on company', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

        expect(mockSocket.on).toBeCalledWith('company', expect.anything());
    })

    it('should call socket.on news', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

        expect(mockSocket.on).toBeCalledWith('news', expect.anything());
    })

    it('should call socket.on keystats', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

        
        expect(mockSocket.on).toBeCalledWith('keystats', expect.anything());
    })

    it('should call socket.on error', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

        
        expect(mockSocket.on).toBeCalledWith('error', expect.anything());
    })

    it('should call socket.on chart', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

      
        expect(mockSocket.on).toBeCalledWith('chart', expect.anything());
    })

    it('should call socket.on search', () => {
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next);

        expect(mockSocket.on).toBeCalledWith('search', expect.anything());
    })

    it('should emit with action: BOOTSTRAP, event: ticker, & payload: aapl', () => {
        const action = bootstrapAction();
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('ticker', 'aapl');
    })

    it('should emit with action: BOOTSTRAP, event: prices, & payload: [aapl,', () => {
        const action = bootstrapAction();
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('prices', ['AMZN', 'MSFT', 'GOOG', 'aapl']);
    })

    it('should emit with action: BOOTSTRAP, event: chart, & payload: aapl', () => {
        const action = bootstrapAction();
        const middleware = initialStartUpMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('chart', ['aapl', '1m']);
    })
}) 