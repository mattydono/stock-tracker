import { createAction } from 'typesafe-actions';
import { StockListItem } from '../models';

export const updateTicker = createAction('UPDATE_TICKER')<string>()

export const updateStockList = createAction('SET_STOCKLIST')<StockListItem[]>()
