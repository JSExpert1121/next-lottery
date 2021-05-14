import { post } from './base';

export const login = (email, password) => post('/api/auth/login', { email, password });