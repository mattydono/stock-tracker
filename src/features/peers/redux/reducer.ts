import { UpdatePeersAction, UPDATE_PEERS } from './actions'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'
import { Reducer } from 'redux'

export const peers: Reducer<string[], UpdatePeersAction> = (
    state = [''],
    action
    ) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE_PEERS: {
            return payload
        }
        case RESET_APP_STATE: {
            return ['']
        }
        default: {
            return state;
        }
    }
}