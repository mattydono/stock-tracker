import { prices } from 'redux/reducers'
import { Prices } from 'models'

const initialState: Prices = [{ ticker: 'aapl', change: 0, changePercent: 0, latestPrice: 0, error: false }]

describe('Search reducer', () => {

    it('should return the initial state', () => {
        expect(prices(
            undefined, 
            {} as any))
            .toEqual(initialState)
    })

    it('should handle an UPDATE_TICKER action', () => {
        const payload = [{
            ticker: 'msft',
            latestPrice: 100,
            change: 10,
            changePercent: 10,
            error: false,
        }]
        const action = {type: 'UPDATE_PRICES_DATA', payload: payload}
        expect(prices(initialState, action))
        .toEqual(payload)
    })
}) 