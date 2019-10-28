import { createAction } from 'redux-actions'
import { _CompanyOverview } from '../../models/companyOverview'

export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const updateCompany = createAction<_CompanyOverview>(UPDATE_COMPANY)
export type UpdateCompanyAction = ReturnType<typeof updateCompany>