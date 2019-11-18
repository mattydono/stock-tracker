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
            {type: 'UPDATE_CHART_RANGE', payload: '1m'} || {type: 'UPDATE_CHART_DATA', payload: []} || {type: 'STOCK_CHANGE'}))
            .toEqual({
                range: '1m',
                prices: [],
        })
    })

    it('should handle an UPDATE_CHART_RANGE action', () => {
        expect(charts(initalState, {type: 'UPDATE_CHART_RANGE', payload: '5d'}))
        .toEqual({
            range: '5d',
            prices: [],
        })
    })

    it('should handle an UPDATE_CHART_DATA action', () => {
        expect(charts(initalState, {type: 'UPDATE_CHART_DATA', payload: [{open: 1, close: 2, date: 'today'}]}))
        .toEqual({
            range: '1m',
            prices: [{open: 1, close: 2, date: 'today'}]
        })
    })

    it('should handle a STOCK_CHANGE action', () => {
        expect(charts(initalState, {type: 'STOCK_CHANGE'}))
        .toEqual({
            range: '1m',
            prices: [],
        })
    })
})