import { post, get } from './base';

// authentication
export const login = (email, password) => post('/api/auth/login', { email, password });
export const signup = (firstName, lastName, email, phone, password, affilliateID) => post('/api/auth/signup', {
  firstName, lastName, email, phone, password, affilliateID
});


export const getBalance = (memberID) => get('/api/user/balance', { memberID });

export const prepareConfirmDeposit = (memberID, amount, ticker) => post('/api/user/deposit', {
  memberID, amount, ticker
});

export const requestWithdraw = (amount, ticker, address) => post('/api/user/withdraw', {
  amount, ticker, address
});
