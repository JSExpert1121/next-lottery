import * as ActionTypes from 'store/action-types';

export const saveCredentials = (email, password) => ({
  type: ActionTypes.STORE_CREDENTIALS,
  payload: { email, password }
})

export const clearCredentials = () => ({
  type: ActionTypes.STORE_CREDENTIALS
})