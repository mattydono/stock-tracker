import { UpdateCompanyAction, UPDATE_COMPANY } from './actions'
import { CompanyOverview } from '../models'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'
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
        case RESET_APP_STATE: {
            return companyOverviewInitialState
        }
        default: {
            return state;
        }
    }
}