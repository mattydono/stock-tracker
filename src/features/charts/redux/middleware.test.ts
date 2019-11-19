import { chartMiddleware } from './middleware'
import { updateChartRange } from './actions'

jest.mock('services/socketService');

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

        const state = { search: { ticker: 'aapl' } };

        store = {
            getState: jest.fn(() => state),
        }

        next = jest.fn();
    })

    it('should emit with event: chart & payload: [aapl, 1m]', () => {
        const action = updateChartRange('1m');
        const middleware = chartMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(mockSocket.emit).toBeCalledWith('chart', ['aapl', '1m']);
    })

    it('should call next middleware', () => {
        const action = updateChartRange('1m');
        const middleware = chartMiddleware({ socketService });

        middleware(store)(next)(action);

        expect(next).toBeCalledWith(action);
    })
})