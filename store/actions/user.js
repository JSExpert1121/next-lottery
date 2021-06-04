import * as ActionTypes from 'store/action-types';

import * as UserService from 'service/client/user';

const setProfile = (data) => ({
  type: ActionTypes.USER_PROFILE_SET,
  payload: data
});

const loggedOut = () => ({ type: ActionTypes.AUTH_USER_LOGGED_OUT });

const setBalance = (data) => ({
  type: ActionTypes.USER_BALANCE_SET,
  payload: data
})

const setTransactions = data => ({
  type: ActionTypes.USER_TRANSACTIONS,
  payload: data
});

const setTickets = data => ({
  type: ActionTypes.USER_TICKETS,
  payload: data
});

const setProducts = data => ({
  type: ActionTypes.USER_PRODIUCTS,
  payload: data
});

// authentication
export const login = (email, password) => async dispatch => {
  const profile = await UserService.login(email, password);
  console.log('User Profile: ', profile);
  const balance = await UserService.getBalance(profile.MemberId);
  console.log('User Balance: ', balance);
  dispatch(setProfile(profile));
  dispatch(setBalance(balance));
}

export const logout = () => dispatch => {
  dispatch(loggedOut());
}

export const signup = (firstName, lastName, email, phone, password, bchID) => async dispatch => {
  const profile = await UserService.signup(firstName, lastName, email, phone, password, bchID);
  console.log('User Profile: ', profile);
  const balance = await UserService.getBalance(profile.MemberId);
  console.log('User Balance: ', balance);
  dispatch(setProfile(profile));
  dispatch(setBalance(balance));
}

// user information
export const getBalance = (memberID) => async dispatch => {
  const res = await UserService.getBalance(memberID);
  dispatch(setBalance(res));
}

export const updateProfile = (
  email, firstName, lastName,
  memberID, phone, mobile, countryCode,
  address, city, state, zipCode, birthday
) => async dispatch => {
  const res = await UserService.updateProfile(email, firstName, lastName,
    memberID, phone, mobile, countryCode,
    address, city, state, zipCode, birthday);
  
  dispatch(setProfile(res));
}

export const resetPassword = (email, oldPwd, newPwd) => async dispatch => {
  await UserService.resetPassword(email, oldPwd, newPwd);
}

export const getTransactions = (page, memberID) => async dispatch => {
  const result = await UserService.getTransactions(page, memberID);
  dispatch(setTransactions(result));
  return result;
}

export const getTickets = (page, memberID) => async dispatch => {
  const result = await UserService.getTickets(page, memberID);
  dispatch(setTickets(result));
  return result;
}

export const getProducts = (page, memberID) => async dispatch => {
  const result = await UserService.getProducts(page, memberID);
  dispatch(setProducts(result));
  return result;
}