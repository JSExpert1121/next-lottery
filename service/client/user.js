import { post, get } from './base';

// authentication
export const login = (email, password) => post('/api/auth/login', { email, password });
export const signup = (firstName, lastName, email, phone, mobile, affiliateID) => post('/api/auth/signup', {
  firstName, lastName, email, phone, mobile, affiliateID
});



export const getBalance = (memberID) => get('/api/user/balance', { memberID });

