import { createAction } from 'redux-actions'
import { _KeyStats } from '../../models/keyStats'

export const UPDATE_KEY_STATS = 'UPDATE_KEY_STATS';
export const updateKeyStats = createAction<_KeyStats>(UPDATE_KEY_STATS)
export type UpdateKeyStatsAction = ReturnType<typeof updateKeyStats>