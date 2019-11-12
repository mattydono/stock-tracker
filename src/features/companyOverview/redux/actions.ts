import { createAction } from 'typesafe-actions'
import { CompanyOverview } from '../models'

export const updateCompany = createAction('UPDATE_COMPANY')<CompanyOverview>()
