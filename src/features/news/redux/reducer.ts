import { UpdateNewsAction, UPDATE_NEWS } from './actions'
import { News } from '../models'
import { STOCK_CHANGE } from '../../../redux/actions/stockChange'
import { Reducer } from 'redux'

const newsInitialState: News = []

export const news: Reducer<News, UpdateNewsAction> = (
    state = newsInitialState,
    action
    ) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE_NEWS: {
            return payload;
        }
        case STOCK_CHANGE: {
            return newsInitialState
        }
        default: {
            return state;
        }
    }
}