import { isActionOf } from 'typesafe-actions'
import { News } from '../models'
import { stockChange } from 'redux/actions/stockChange'
import { Reducer } from 'redux'
import { updateNews } from './actions'

const newsInitialState: News = []

export const news: Reducer<Readonly<News>> = (
    state = newsInitialState,
    action
    ) => {
        if (isActionOf(updateNews, action)) {
            return action.payload
        }

        if (isActionOf(stockChange, action)) {
            return newsInitialState
        }

        return state
}