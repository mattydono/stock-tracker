import { Charts } from '../models'
import {
    UpdateChartDataAction, UPDATE_CHART_DATA, 
    UpdateChartRangeAction, UPDATE_CHART_RANGE,
} from './actions'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'
import { Reducer } from 'redux'

const chartsIntitialState: Charts = {
    range: '1m',
    prices: [],
}

type ChartsActionTypes = UpdateChartDataAction | UpdateChartRangeAction

export const charts: Reducer<Charts, ChartsActionTypes> = (
    state = chartsIntitialState, 
    action
    ) => {
    const { type } = action;
    switch (type) {
        case UPDATE_CHART_RANGE: {
            const updateChartRangeAction = action as UpdateChartRangeAction
            const { payload } = updateChartRangeAction
            return { ...state, range: payload };
        }
        case UPDATE_CHART_DATA: {
            const updateChartDataAction = action as UpdateChartDataAction
            const { payload } = updateChartDataAction
            return { ...state, prices: payload };
        }
        case RESET_APP_STATE: {
            return { ...state, prices: [] };
        }
        default: {
            return state;
        }
    }
}