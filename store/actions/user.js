import * as ActionTypes from 'store/action-types';

import * as UserService from 'service/client/user';

const loginOK = (data) => ({
  type: ActionTypes.AUTH_USER_LOGGED_IN,
  payload: data
});

const loggedOut = () => ({ type: ActionTypes.AUTH_USER_LOGGED_OUT });

const setBalance = (data) => ({
  type: ActionTypes.USER_BALANCE_SET,
  payload: data
})

// authentication
export const login = (email, password) => async dispatch => {
  const profile = await UserService.login(email, password);
  console.log('User Profile: ', profile);
  const balance = await UserService.getBalance(profile.MemberId);
  console.log('User Balance: ', balance);
  dispatch(loginOK(profile));
  dispatch(setBalance(balance));
}

export const logout = () => dispatch => {
  dispatch(loggedOut());
}

export const signup = (firstName, lastName, email, phone, password, bchID) => async dispatch => {
  const res = await UserService.signup(firstName, lastName, email, phone, password, bchID);
  console.log('Sign up: ', res);
  dispatch(loginOK(res));
}

// user information
export const getBalance = (memberID) => async dispatch => {
  const res = await UserService.getBalance(memberID);
  console.log('User Balance: ', res);
  dispatch(setBalance(res));
}