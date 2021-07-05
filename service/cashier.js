import { API_BASE_URL, SEC_TOKEN, BRAND_ID } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/cashier`;

export const requestWithdraw = async (amount, ticker, address) => {
	return await authPost(
		`${BASE_URL}/withdraw`,
		SEC_TOKEN,
		{ amt: amount, walletAddress: address, Ticker: ticker }
	);
}

export const prepareOrder = async (MemberId, numbers) => {
	return await authPost(
		`${BASE_URL}/prepare-order`,
		SEC_TOKEN,
		{ MemberId, BrandId: BRAND_ID, ProductNumsLottery: numbers }
	);
}

export const confirmProcessorOrder = async (
	memberId,
	email,
	session,
	ticker,
	orderData
) => {
	return await authPost(
		`${BASE_URL}/processor-confirm-order`,
		SEC_TOKEN,
		{ 
			PhoneOrEmail: email,
			ProcessorApi: '',
			AffiliatedId: 0,
			ReedemCode: '',
			SessionId: session,
			MemberId: memberId,
			Ticker: ticker,
			OrderData: orderData,
			BrandID: BRAND_ID
		}
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

export const confirmProcessorFireGameOrder = async (
	memberId,
	email,
	session,
	ticker,
	orderData
) => {
	return await authPost(
		`${BASE_URL}/processor-confirm-order`,
		SEC_TOKEN,
		{ 
			PhoneOrEmail: email,
			ProcessorApi: '',
			AffiliatedId: 0,
			ReedemCode: '',
			SessionId: session,
			MemberId: memberId,
			Ticker: ticker,
			OrderData: orderData,
			BrandID: BRAND_ID
		}
	);
}

export const confirmProcessorDeposit = async (MemberId, Amount, Ticker) => {
	return await authPost(
		`${BASE_URL}/processor-confirm-deposit`,
		SEC_TOKEN,
		{ BrandId: BRAND_ID, MemberId, Amount, Ticker }
	);
}

export const vouchersDeposit = async () => {
	return await authPost(
		`${BASE_URL}/CreditVouchers-deposit`,
		SEC_TOKEN
	);
}

export const confirmProcessorRaffleGameOrder = async (
	memberId, coin, lottoType, numbers
) => {
	return await authPost(
		`${BASE_URL}/processor-confirm-raffle-game-order`,
		SEC_TOKEN,
		{ 
			PhoneOrEmail: "eyal@bravio.com",
			ProcessorApi: '',
			RaffleNumbersID: numbers,
			LotteryType: lottoType,
			MemberId: memberId,
			Ticker: coin,
			BrandID: BRAND_ID
		}
	);
}