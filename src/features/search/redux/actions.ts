import { createAction } from 'typesafe-actions';
import { StockListItem } from '../models';

export const updateTicker = createAction('UPDATE_TICKER')<string>()

export const updateStockList = createAction('UPDATE_STOCKLIST')<StockListItem[]>()

export const updateQuery = createAction('UPDATE_QUERY')<string>()