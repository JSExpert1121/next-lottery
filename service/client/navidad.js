import { post, get } from './base';

// authentication
export const getNumbers = (memberId, numbers, type) => post('/api/navidad/get-numbers', {
	LotteryType: type, NumbersCount: numbers, MemberId: memberId }
);

export const confirmRaffleOrder = (memberId,
  coin,
  type,
  numbers
) => post('/api/navidad/confirm-order', {
  memberId, type, coin, numbers
})