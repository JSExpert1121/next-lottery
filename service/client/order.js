import { post, get } from './base';

// authentication
export const prepareOrder = (memberId, numbers) => post('/api/user/order-prepare', { memberId, numbers });
export const confirmOrder = (memberId, numbers) => post('/api/user/order-confirm', { memberId, numbers });
