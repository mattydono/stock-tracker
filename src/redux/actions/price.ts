import { createAction } from 'redux-actions'
import { PriceSingleDataPoint } from '../../models/prices'

export const UPDATE_PRICES_DATA = 'UPDATE_PRICES_DATA';
export const updatePricesData = createAction<PriceSingleDataPoint[]>(UPDATE_PRICES_DATA);
export type UpdatePricesDataAction = ReturnType<typeof updatePricesData>;