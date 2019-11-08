import { Reducer } from 'redux'
import { Error } from 'models/errors'
import { ERROR, ErrorAction } from '../actions/error'

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

export const errors: Reducer<ErrorState, ErrorAction> = (state = errorsInitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ERROR: {
            return {...state, [payload]: true}
        }
        default: {
            return state;
        }
    }
}