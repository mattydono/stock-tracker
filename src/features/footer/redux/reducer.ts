import { isActionOf } from 'typesafe-actions'
import { Reducer } from 'redux'
import { updateFavoritesAddTicker, updateFavoritesRemoveTicker } from './actions';

const favoritesInitialState: string[] = ['amzn', 'msft', 'fb']

export const favorites: Reducer<string[]> = (
    state = favoritesInitialState,
    action
    ) => {
        if (isActionOf(updateFavoritesAddTicker, action)) {
            return ([
                ...state,
                action.payload
            ])
        }

        if (isActionOf(updateFavoritesRemoveTicker, action)) {
            return state.filter(ticker => ticker !== action.payload)
        }

        return state
}