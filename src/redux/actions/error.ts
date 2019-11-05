import { createAction } from 'redux-actions'

export const ERROR = 'ERROR';
export const errorAction = createAction<string>(ERROR);
export type ErrorAction = ReturnType<typeof errorAction>