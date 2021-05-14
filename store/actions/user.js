import * as ActionTypes from 'store/action-types';

import * as UserService from 'service/client/user';

const loginOK = (data) => ({
  type: ActionTypes.AUTH_LOGIN_SUCCESS,
  payload: data
});


export const login = (email, password) => async dispatch => {
  try {
    const res = await UserService.login(email, password);
    console.log(res);
    dispatch(loginOK(res));
  } catch (error) {
    throw error;
  }
}