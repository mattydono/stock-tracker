import { createAction } from 'redux-actions'

export const FAVORITES_ADD_TICKER = 'FAVORITES_ADD_TICKER';
export const updateFavoritesAddTicker = createAction<string>(FAVORITES_ADD_TICKER);
export type UpdateFavoritesAddTickerAction = ReturnType<typeof updateFavoritesAddTicker>;

export const FAVORITES_REMOVE_TICKER = 'FAVORITES_REMOVE_TICKER';
export const updateFavoritesRemoveTicker = createAction<string>(FAVORITES_REMOVE_TICKER);
export type UpdateFavoritesRemoveTickerAction = ReturnType<typeof updateFavoritesRemoveTicker>;