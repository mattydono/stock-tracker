import { Reducer } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { CompanyOverview } from '../models'
import { stockChange } from 'redux/actions/stockChange'
import { updateCompany } from './actions'

const companyOverviewInitialState: CompanyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: [],
}

export const companyOverview: Reducer<Readonly<CompanyOverview>> = (
    state = companyOverviewInitialState, 
    action
    ) => {
        if (isActionOf(updateCompany, action)) {
            return action.payload
        }

        if (isActionOf(stockChange, action)) {
            return companyOverviewInitialState
        }

        return state
}