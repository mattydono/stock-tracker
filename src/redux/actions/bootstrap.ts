import { createAction } from 'redux-actions'

export const BOOTSTRAP = 'RESET_APP_STATE';
export const bootstrapAction = createAction(BOOTSTRAP);
export type BootStrapAction = ReturnType<typeof bootstrapAction>
