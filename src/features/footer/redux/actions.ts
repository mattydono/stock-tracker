import { createAction } from 'typesafe-actions'

export const updateFavoritesAddTicker = createAction('FAVORITES_ADD_TICKER')<string>()

export const updateFavoritesRemoveTicker = createAction('FAVORITES_REMOVE_TICKER')<string>()
