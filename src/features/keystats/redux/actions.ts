import { createAction } from 'typesafe-actions'
import { KeyStats } from '../models'

export const updateKeyStats = createAction('UPDATE_KEY_STATS')<KeyStats>()
