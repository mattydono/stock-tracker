import { createAction } from 'redux-actions'

export const BOOTSTRAP = 'STOCK_CHANGE';
export const bootstrapAction = createAction(BOOTSTRAP);
export type BootStrapAction = ReturnType<typeof bootstrapAction>
