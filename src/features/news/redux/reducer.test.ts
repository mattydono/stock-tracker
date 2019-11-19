import { news } from './reducer'
import { News } from '../models'

const initialState: News = []

describe('KeyStats reducer', () => {

    it('should return the initial state', () => {
        expect(news(
            undefined, 
            {} as any))
            .toEqual(initialState)
    })

    it('should handle an UPDATE_NEWS action', () => {
        const payload = [{
            url: 'www.apple.com',
            headline: 'Apple News',
            datetime: 100,
            source: 'www.AppleNews.com',
        }]
        const action = {type: 'UPDATE_NEWS', payload: payload}
        expect(news(initialState, action))
        .toEqual(payload)
    })

    it('should handle a STOCK_CHANGE action', () => {
        const action = {type: 'STOCK_CHANGE'}
        expect(news(initialState, action))
        .toEqual(initialState)
    })
})