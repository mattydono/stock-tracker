import { CompanyOverview } from "../models"
import { companyOverview } from "./reducer"

const initalState: CompanyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: [],
}

describe('Company reducer', () => {

    it('should return the initial state', () => {
        expect(companyOverview(
            undefined, 
            {} as any))
            .toEqual({
                symbol: null,
                companyName: null,
                website: null,
                description: null,
                tags: [],
        })
    })

    it('should handle an UPDATE_COMPANY action', () => {
        const payload = {
            symbol: 'aapl',
            companyName: 'Apple',
            website: 'www.apple.com',
            description: 'Apple tech company',
            tags: ['MSFT', 'AMZN'],
        }
        const action = {type: 'UPDATE_COMPANY', payload: payload}
        expect(companyOverview(initalState, action))
        .toEqual({
            symbol: 'aapl',
            companyName: 'Apple',
            website: 'www.apple.com',
            description: 'Apple tech company',
            tags: ['MSFT', 'AMZN'],
        })
    })

    it('should handle a STOCK_CHANGE action', () => {
        const action = {type: 'STOCK_CHANGE'}
        expect(companyOverview(initalState, action))
        .toEqual({
            symbol: null,
            companyName: null,
            website: null,
            description: null,
            tags: [],
        })
    })
})
