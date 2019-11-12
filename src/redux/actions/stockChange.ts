import { createAction } from 'redux-actions'

export const STOCK_CHANGE = 'STOCK_CHANGE'
export const stockChange = createAction(STOCK_CHANGE)
export type StockChangeAction = ReturnType<typeof stockChange>