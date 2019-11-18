import { Reducer } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { errorAction } from 'redux/actions'
import { Errors } from '../../models/errors'

const errorsInitialState: Errors = {
    quote: false,
    news: false,
    company: false,
    peers: false,
    favorites: false,
    chart: false,
    prices: false,
    search: false,
}

export const errors: Reducer<Readonly<Errors>> = (
    state = errorsInitialState, 
    action
    ) => {
        if (isActionOf(errorAction, action)) {
            return {...state, [action.payload]: true}
        }

        return state
}