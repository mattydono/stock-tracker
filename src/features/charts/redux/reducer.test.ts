import { charts } from './reducer'
import { Charts } from '../models'

const initalState: Charts = {
    range: '1m',
    prices: [],
}

describe('Charts reducer', () => {

    it('should return the initial state', () => {
        expect(charts(
            initalState, 
            undefined as any))
            .toEqual({
                range: '1m',
                prices: [],
        })
    })

    it('should handle an UPDATE_CHART_RANGE action', () => {
        const action = {type: 'UPDATE_CHART_RANGE', payload: '5d'}
        expect(charts(initalState, action))
        .toEqual({
            range: '5d',
            prices: [],
        })
    })

    it('should handle an UPDATE_CHART_DATA action', () => {
        const action = {type: 'UPDATE_CHART_DATA', payload: [{open: 1, close: 2, date: 'today'}]}
        expect(charts(initalState, action))
        .toEqual({
            range: '1m',
            prices: [{open: 1, close: 2, date: 'today'}]
        })
    })

    it('should handle a STOCK_CHANGE action', () => {
        const action = {type: 'STOCK_CHANGE'}
        expect(charts(initalState, action))
        .toEqual({
            range: '1m',
            prices: [],
        })
    })
})
