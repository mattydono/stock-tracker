import { createAction } from 'redux-actions'

export const UPDATE_PEERS = 'UPDATE_PEERS';
export const updatePeers = createAction<string[]>(UPDATE_PEERS)
export type UpdatePeersAction = ReturnType<typeof updatePeers>