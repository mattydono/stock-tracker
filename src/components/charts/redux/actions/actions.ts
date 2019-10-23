import { createAction } from 'redux-actions'
import { _ChartSingleDataPoint, Range } from '../../models'

export const UPDATE_CHART_RANGE = 'UPDATE_CHART_RANGE';
export const updateChartRange = createAction<Range>(UPDATE_CHART_RANGE)
export type UpdateChartRangeAction = ReturnType<typeof updateChartRange>

export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const updateChartData = createAction<_ChartSingleDataPoint[]>(UPDATE_CHART_DATA)
export type UpdateChartDataAction = ReturnType<typeof updateChartData>