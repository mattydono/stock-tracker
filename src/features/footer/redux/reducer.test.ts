import { favorites } from './reducer'

const initialState: string[] = ['amzn', 'msft', 'fb']

describe('Footer reducer', () => {

    it('should return the initial state', () => {
        expect(favorites(
            undefined, 
            {} as any))
            .toEqual(['amzn', 'msft', 'fb'])
    })

    it('should handle an FAVORITES_ADD_TICKER action', () => {
        const action = {type: 'FAVORITES_ADD_TICKER', payload: 'aapl'}
        expect(favorites(initialState, action))
        .toEqual(['amzn', 'msft', 'fb', 'aapl'])
    })

    it('should handle a FAVORITES_REMOVE_TICKER action', () => {
        const action = {type: 'FAVORITES_REMOVE_TICKER', payload: 'fb'}
        expect(favorites(initialState, action))
        .toEqual(['amzn', 'msft'])
    })
})
