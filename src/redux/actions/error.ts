import { createAction } from 'typesafe-actions'

export const errorAction = createAction('ERROR')<string>()
