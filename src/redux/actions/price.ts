import { createAction } from 'typesafe-actions'
import { PriceSingleDataPoint } from 'models/prices'

export const updatePricesData = createAction('UPDATE_PRICES_DATA')<PriceSingleDataPoint[]>()
