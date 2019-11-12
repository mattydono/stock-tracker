import { createAction } from 'typesafe-actions'
import { News } from '../models'

export const updateNews = createAction('UPDATE_NEWS')<News>()
