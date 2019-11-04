import { createAction } from 'redux-actions'
import { CompanyOverview } from '../models/companyOverview'

export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const updateCompany = createAction<CompanyOverview>(UPDATE_COMPANY)
export type UpdateCompanyAction = ReturnType<typeof updateCompany>