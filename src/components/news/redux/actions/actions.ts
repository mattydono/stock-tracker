import { createAction } from 'redux-actions'
import { _News } from '../../models/news'

export const UPDATE_NEWS = 'UPDATE_NEWS';
export const updateNews = createAction<_News>(UPDATE_NEWS)
export type UpdateNewsAction = ReturnType<typeof updateNews>