import { _Charts } from '../../models'
import {
    UpdateChartDataAction, UPDATE_CHART_DATA, 
    UpdateChartRangeAction, UPDATE_CHART_RANGE,
} from '../actions/actions'
import { RESET_APP_STATE } from '../../../../redux/actions'

const chartsIntitialState: _Charts = {
    range: '1m',
    prices: [],
}

export const charts = (
    state = chartsIntitialState, 
    action: UpdateChartDataAction | UpdateChartRangeAction
    ) => {
    switch (action.type) {
        case UPDATE_CHART_RANGE: {
            const updateChartRangeAction = action as UpdateChartRangeAction
            const { payload } = updateChartRangeAction;
            return ({ ...state, range: payload })
        }
        case UPDATE_CHART_DATA: {
            const updateChartDataAction = action as UpdateChartDataAction
            const { payload } = updateChartDataAction;
            return ({ ...state, prices: payload });
        }
        case RESET_APP_STATE: {
            return chartsIntitialState
        }
        default: {
            return state;
        }
    }
}