import { createAction } from 'typesafe-actions'
import { ChartSingleDataPoint, Range } from '../models'

export const updateChartRange = createAction('UPDATE_CHART_RANGE')<Range>()

export const updateChartData = createAction('UPDATE_CHART_DATA')<ChartSingleDataPoint[]>()
