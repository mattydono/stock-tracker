import { createAction } from 'redux-actions'
import { _Error } from '../../models/errors'

export const ERROR = 'ERROR';
export const errorAction = createAction<string>(ERROR);
export type ErrorAction = ReturnType<typeof errorAction>