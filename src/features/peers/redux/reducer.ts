import { UpdatePeersAction, UPDATE_PEERS } from './actions'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'

export const peers = (
    state = [''],
    action: UpdatePeersAction
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