import { UpdateCompanyAction, UPDATE_COMPANY } from './actions'
import { CompanyOverview } from '../models/companyOverview'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'

const companyOverviewInitialState: CompanyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: [],
}

export const companyOverview = (
    state = companyOverviewInitialState, 
    action: UpdateCompanyAction
    ) => {
    const { type, payload } = action 
    switch (action.type) {
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