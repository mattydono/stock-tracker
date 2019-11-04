import { createAction } from 'redux-actions'
import { News } from '../models/news'

export const UPDATE_NEWS = 'UPDATE_NEWS';
export const updateNews = createAction<News>(UPDATE_NEWS)
export type UpdateNewsAction = ReturnType<typeof updateNews>