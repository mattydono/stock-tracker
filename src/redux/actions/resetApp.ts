import { createAction } from 'redux-actions'

export const RESET_APP_STATE = 'RESET_APP_STATE';
export const resetState = createAction(RESET_APP_STATE);
export type ResetStateAction = ReturnType<typeof resetState>