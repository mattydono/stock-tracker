import { peers } from './reducer'

const initialState: string[] = []

describe('KeyStats reducer', () => {

    it('should return the initial state', () => {
        expect(peers(
            undefined, 
            {} as any))
            .toEqual(initialState)
    })

    it('should handle an UPDATE_PEERS action', () => {
        const payload = ['MSFT']
        const action = {type: 'UPDATE_PEERS', payload: payload}
        expect(peers(initialState, action))
        .toEqual(payload)
    })

    it('should handle a STOCK_CHANGE action', () => {
        const action = {type: 'STOCK_CHANGE'}
        expect(peers(initialState, action))
        .toEqual(initialState)
    })
})