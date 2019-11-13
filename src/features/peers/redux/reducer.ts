import { isActionOf } from 'typesafe-actions'
import { stockChange } from 'redux/actions/stockChange'
import { Reducer } from 'redux'
import { updatePeers } from './actions'

export const peers: Reducer<Readonly<string[]>> = (
    state = [],
    action
    ) => {
        if( isActionOf(updatePeers, action)) {
            return action.payload
        }

        if (isActionOf(stockChange, action)) {
            return []
        }

        return state
}