import { createAction } from 'typesafe-actions'

export const updatePeers = createAction('UPDATE_PEERS')<string[]>()
