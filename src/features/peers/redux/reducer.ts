import { UpdatePeersAction, UPDATE_PEERS } from './actions'
import { STOCK_CHANGE } from '../../../redux/actions/stockChange'
import { Reducer } from 'redux'

export const peers: Reducer<string[], UpdatePeersAction> = (
    state = [],
    action
    ) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE_PEERS: {
            return payload
        }
        case STOCK_CHANGE: {
            return []
        }
        default: {
            return state;
        }
    }
}