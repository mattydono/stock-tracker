import { UpdateCompanyAction, UPDATE_COMPANY } from '../actions'
import { _CompanyOverview } from '../../models/companyOverview'
import { RESET_APP_STATE } from '../../../../redux/actions/resetApp'

const companyOverviewInitialState: _CompanyOverview = {
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
    switch (action.type) {
        case UPDATE_COMPANY: {
            const updateCompanyAction = action as UpdateCompanyAction
            const { payload } = updateCompanyAction;
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