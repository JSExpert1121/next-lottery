import { API_BASE_URL, SEC_TOKEN, BRAND_ID } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/mailservice`;

export const requestResetPwd = async (memberID, email, actionLink, lang) => {
	return await authPost(
		`${BASE_URL}/send-reset-password`,
		SEC_TOKEN,
		{
			MemberID: memberID,
			BrandID: BRAND_ID,
			Email: email,
			ActionLink: actionLink,
			Language: lang
		}
	);
}

export const sendWelcome = async (memberID, email, lang) => {
	return await authPost(
		`${BASE_URL}/send-welcome`,
		SEC_TOKEN,
		{
			MemberID: memberID,
			BrandID: BRAND_ID,
			Email: email,
			Language: lang
		}
	);
}

export const sendWithdraw = async (memberID, amount, toAddr) => {
	return await authPost(
		`${BASE_URL}/send-withdraw`,
		SEC_TOKEN,
		{
			MemberID: memberID,
			BrandID: BRAND_ID,
			Amount: amount,
			WalletAddress: toAddr
		}
	);
}