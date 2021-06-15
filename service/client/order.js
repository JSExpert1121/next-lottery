import { post, get } from './base';

// authentication
export const prepareOrder = (memberId, numbers) => post('/api/user/order-prepare', { memberId, numbers });

export const confirmOrder = (
  memberId, 
  email,
  session,
  draws,
  ticker,
  lotteryTypeId,
  isVIP,
  isCash,
  isOnline,
  productId,
  numbers
) => post('/api/user/order-confirm', {
  memberId,
  email,
  session,
  draws,
  ticker,
  lotteryTypeId,
  isVIP,
  isCash,
  isOnline,
  productId,
  numbers
});
