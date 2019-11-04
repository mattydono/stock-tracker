import { UpdatePeersAction, UPDATE_PEERS } from '../actions/actions'
import { RESET_APP_STATE } from '../../../../redux/actions/resetApp'

export const peers = (
    state = [''],
    action: UpdatePeersAction
    ) => {
    switch (action.type) {
        case UPDATE_PEERS: {
            const updatePeersAction = action as UpdatePeersAction
            const { payload } = updatePeersAction;
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