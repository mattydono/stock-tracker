import { Reducer } from 'redux'
import { UpdateNewsAction, UPDATE_NEWS } from './actions'
import { News } from '../models'
import { RESET_APP_STATE } from 'redux/actions/resetApp'

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
        case RESET_APP_STATE: {
            return newsInitialState
        }
        default: {
            return state;
        }
    }
}