import { API_BASE_URL, SEC_TOKEN } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/cashier`;

export const requestWithdraw = async (amount, ticker, address) => {
	return await authPost(
		`${BASE_URL}/withdraw`,
		SEC_TOKEN,
		{ amt: amount, walletAddress: address, Ticker: ticker }
	);
}

export const prepareOrder = async () => {
	return await authPost(
		`${BASE_URL}/get-all-lotteries`,
		SEC_TOKEN
	);
}

export const confirmProcessorOrder = async (MemberId, Amount, Ticker) => {
	return await authPost(
		`${BASE_URL}/processor-confirm-order`,
		SEC_TOKEN,
		{ MemberId, Amount, Ticker }
	);
}

export const getMemberPaymentMethods = async () => {
	return await authPost(
		`${BASE_URL}/get-member-payment-methods`,
		SEC_TOKEN
	);
}

export const depositFunds = async () => {
	return await authPost(
		`${BASE_URL}/deposit-funds`,
		SEC_TOKEN
	);
}

export const confirmProcessorFireGameOrder = async () => {
	return await authPost(
		`${BASE_URL}/processor-confirm-fire-game-order`,
		SEC_TOKEN
	);
}

export const confirmProcessorDeposit = async () => {
	return await authPost(
		`${BASE_URL}/processor-confirm-fire-game-order`,
		SEC_TOKEN
	);
}

export const vouchersDeposit = async () => {
	return await authPost(
		`${BASE_URL}/CreditVouchers-deposit`,
		SEC_TOKEN
	);
}

export const confirmProcessorRaffleGameOrder = async () => {
	return await authPost(
		`${BASE_URL}/processor-confirm-raffle-game-order`,
		SEC_TOKEN
	);
}