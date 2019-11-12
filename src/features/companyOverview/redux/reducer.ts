import { UpdateCompanyAction, UPDATE_COMPANY } from './actions'
import { CompanyOverview } from '../models'
import { STOCK_CHANGE } from '../../../redux/actions/stockChange'
import { Reducer } from 'redux'

const companyOverviewInitialState: CompanyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: [],
}

export const companyOverview: Reducer<CompanyOverview, UpdateCompanyAction> = (
    state = companyOverviewInitialState, 
    action
    ) => {
    const { type, payload } = action 
    switch (type) {
        case UPDATE_COMPANY: {
            return payload;
        }
        case STOCK_CHANGE: {
            return companyOverviewInitialState
        }
        default: {
            return state;
        }
    }
}