import { keyStats } from './reducer'
import { KeyStats } from '../models'

const initialState: KeyStats = {
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null,
    avgTotalVolume: null,
    previousClose: null,
    low: null,
    high: null,
    volume: null,
    open: null,
    dividendYield: null,
    actualEPS: null,
    primaryExchange: null,
    latestTime: null,
    isUSMarketOpen: false,
    isFetchingQuote: false,
}
describe('KeyStats reducer', () => {

    it('should return the initial state', () => {
        expect(keyStats(
            undefined, 
            {} as any))
            .toEqual(initialState)
    })

    it('should handle an UPDATE_KEY_STATS action', () => {
        const payload = {
            marketCap: 1,
            peRatio: 2,
            week52High: 4,
            week52Low: 3,
            avgTotalVolume: 5,
            previousClose: 6,
            low: 8,
            high: 9,
            volume: 10,
            open: 11,
            dividendYield: 12,
            actualEPS: 13,
            primaryExchange: 14,
            latestTime: 15,
            isUSMarketOpen: true,
            isFetchingQuote: true,
        }
        const action = {type: 'UPDATE_KEY_STATS', payload: payload}
        expect(keyStats(initialState, action))
        .toEqual(payload)
    })

    it('should handle a STOCK_CHANGE action', () => {
        const action = {type: 'STOCK_CHANGE'}
        expect(keyStats(initialState, action))
        .toEqual(initialState)
    })
})
