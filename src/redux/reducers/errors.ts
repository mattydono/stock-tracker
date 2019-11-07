import { Error } from 'models/errors'
import { ERROR, ErrorAction } from '../actions/error'

export interface ErrorState {
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

export const errors = (state = errorsInitialState, action: ErrorAction) => {
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