import { Reducer } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { Charts } from '../models'
import { stockChange } from 'redux/actions/stockChange'
import { updateChartRange, updateChartData } from './actions'

const chartsIntitialState: Charts = {
    range: '1m',
    prices: [],
}

export const charts: Reducer<Charts> = (
    state = chartsIntitialState, 
    action
    ) => {
    
        if (isActionOf(updateChartRange, action)) {
            return { ...state, range: action.payload };
        }

        if (isActionOf(updateChartData, action)) {
            return { ...state, prices: action.payload };
        }

        if (isActionOf(stockChange, action)) {
            return { ...state, prices: [] };
        }

        return state
}