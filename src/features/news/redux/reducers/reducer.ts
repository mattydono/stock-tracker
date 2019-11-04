import { UpdateNewsAction, UPDATE_NEWS } from '../actions/actions'
import { _News } from '../../models/news'
import { RESET_APP_STATE } from '../../../../redux/actions/resetApp'

const newsInitialState: _News = []

export const news = (
    state = newsInitialState,
    action: UpdateNewsAction
    ) => {
    switch (action.type) {
        case UPDATE_NEWS: {
            const updateNewsAction = action as UpdateNewsAction
            const { payload } = updateNewsAction;
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