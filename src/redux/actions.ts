import { createAction } from 'redux-actions'
import { _CompanyOverview, _KeyStats, Range, _ChartSingleDataPoint, _News } from '../models'

export const UPDATE_TICKER = 'UPDATE_TICKER';
export const updateTicker = createAction<string>(UPDATE_TICKER)
export type UpdateTickerAction = ReturnType<typeof updateTicker>

export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const updateCompany = createAction<_CompanyOverview>(UPDATE_COMPANY)
export type UpdateCompanyAction = ReturnType<typeof updateCompany>

export const UPDATE_KEY_STATS = 'UPDATE_KEY_STATS';
export const updateKeyStats = createAction<_KeyStats>(UPDATE_KEY_STATS)
export type UpdateKeyStatsAction = ReturnType<typeof updateKeyStats>

export const UPDATE_NEWS = 'UPDATE_NEWS';
export const updateNews = createAction<_News>(UPDATE_NEWS)
export type UpdateNewsAction = ReturnType<typeof updateNews>

export const UPDATE_PEERS = 'UPDATE_PEERS';
export const updatePeers = createAction<string[]>(UPDATE_PEERS)
export type UpdatePeersAction = ReturnType<typeof updatePeers>

export const UPDATE_CHART_RANGE = 'UPDATE_CHART_RANGE';
export const updateChartRange = createAction<Range>(UPDATE_CHART_RANGE)
export type UpdateChartRangeAction = ReturnType<typeof updateChartRange>

export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const updateChartData = createAction<_ChartSingleDataPoint[]>(UPDATE_CHART_DATA)
export type UpdateChartDataAction = ReturnType<typeof updateChartData>
