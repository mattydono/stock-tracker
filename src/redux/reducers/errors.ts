import { Reducer } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { errorAction } from 'redux/actions'

export type ErrorState = {
    quote: boolean,
    news: boolean,
    company: boolean,
    peers: boolean,
    favorites: boolean,
}

const errorsInitialState: ErrorState = {
    quote: false,
    news: false,
    company: false,
    peers: false,
    favorites: false,
}

export const errors: Reducer<ErrorState> = (
    state = errorsInitialState, 
    action
    ) => {
        if (isActionOf(errorAction, action)) {
            return {...state, [action.payload]: true}
        }

        return state
}