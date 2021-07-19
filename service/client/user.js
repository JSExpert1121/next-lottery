import { post, get } from './base';

// authentication
export const login = (email, password) => post('/api/auth/login', { email, password });
export const signup = (firstName, lastName, email, phone, password, affiliateID) => post('/api/auth/signup', {
  firstName, lastName, email, phone, password, affiliateID
});


export const getBalance = (memberID) => get('/api/user/balance', { memberID });

export const prepareConfirmDeposit = (memberID, amount, ticker) => post('/api/user/deposit', {
  memberID, amount, ticker
});

export const requestWithdraw = (memberId, amount, address) => post('/api/user/withdraw', {
  memberId, amount, address
});

export const getProfile = (memberID) => get('/api/user/profile', { memberID });

export const updateProfile = (
  email, firstName, lastName,
  memberID, phone, mobile, countryCode,
  address, city, state, zipCode, birthday
) => post('/api/user/update-profile', {
  email, firstName, lastName, memberID, phone, mobile, countryCode,
  address, city, state, zipCode, birthday
});

export const resetPassword = (email, oldPwd, newPwd) => post('/api/user/reset-password', {
  email, oldPwd, newPwd
});

export const getTransactions = (page, memberID) => post('/api/user/transactions', {
  page, memberID
});

export const getTickets = (page, memberID) => post('/api/user/tickets', {
  page, memberID
});

export const getProducts = (page, memberID) => post('/api/user/products', {
  page, memberID
});

export const getUserBySysSessionId = (sessionId) => get('/api/user/by-syssession', {
  sessionId
});