import { errors } from 'redux/reducers'
import { Errors } from 'models'

const initialState: Errors = {
    quote: false,
    news: false,
    company: false,
    peers: false,
    favorites: false,
    chart: false,
    prices: false,
    search: false,
}
describe('Errors reducer', () => {

    it('should return the initial state', () => {
        expect(errors(
            undefined, 
            {} as any))
            .toEqual(initialState)
    })

    it('should handle an ERROR action', () => {
        const payload = 'quote'
        const action = {type: 'ERROR', payload: payload}
        expect(errors(initialState, action))
        .toEqual({
            quote: true,
            news: false,
            company: false,
            peers: false,
            favorites: false,
            chart: false,
            prices: false,
            search: false,
        })
    })
}) 