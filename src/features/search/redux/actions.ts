import { createAction } from 'redux-actions'
import { StockListItem } from '../models'

export const UPDATE_TICKER = 'UPDATE_TICKER';
export const updateTicker = createAction<string>(UPDATE_TICKER)
export type UpdateTickerAction = ReturnType<typeof updateTicker>

export const SET_STOCKLIST = 'SET_STOCKLIST'
export const updateStockList = createAction<StockListItem[]>(SET_STOCKLIST)
export type UpdateStockListAction = ReturnType<typeof updateStockList>