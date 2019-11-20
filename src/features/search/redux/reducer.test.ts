import { search } from './reducer'
import { Search } from '../models'
import { statement } from '@babel/template'

const initialState: Search = {
    ticker: 'aapl',
    stockList: [],
    query: 'Apple Inc (AAPL)',
}
describe('Search reducer', () => {

    it('should return the initial state', () => {
        expect(search(
            undefined, 
            {} as any))
            .toEqual(initialState)
    })

    it('should handle an UPDATE_TICKER action', () => {
        const payload = 'MSFT'
        const action = {type: 'UPDATE_TICKER', payload: payload}
        expect(search(initialState, action))
        .toEqual({
            ticker: payload,
            stockList: [],
            query: 'Apple Inc (AAPL)'
        })
    })

    it('should handle an UPDATE_STOCKLIST action', () => {
        const payload = [{symbol: 'MSFT', name: 'Microsoft'}]
        const action = {type: 'UPDATE_STOCKLIST', payload: payload}
        expect(search(initialState, action))
        .toEqual({
            ticker: 'aapl',
            stockList: payload,
            query: 'Apple Inc (AAPL)'
        })
    })

    it('should handle an UPDATE_QUERY action', () => {
        const payload = 'AMZN'
        const action = {type: 'UPDATE_QUERY', payload: payload}
        expect(search(initialState, action))
        .toEqual({
            ticker: 'aapl',
            stockList: [],
            query: 'AMZN'
        })
    })
})