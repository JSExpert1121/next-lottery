import { API_BASE_URL, SEC_TOKEN } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/mailservice`;

export const requestResetPwd = async (memberID, brandID, email, actionLink, lang) => {
	return await authPost(
		`${BASE_URL}/send-reset-password`,
		SEC_TOKEN,
		{
			MemberID: memberID,
			BrandID: brandID,
			Email: email,
			ActionLink: actionLink,
			Language: lang
		}
	);
}

export const sendWelcome = async (memberID, brandID, email, lang) => {
	return await authPost(
		`${BASE_URL}/send-welcome`,
		SEC_TOKEN,
		{
			MemberID: memberID,
			BrandID: brandID,
			Email: email,
			ActionLink: actionLink,
			Language: lang
		}
	);
}

export const sendWithdraw = async (memberID, brandID, amount, toAddr) => {
	return await authPost(
		`${BASE_URL}/send-withdraw`,
		SEC_TOKEN,
		{
			MemberID: memberID,
			BrandID: brandID,
			Amount: amount,
			WalletAddress: toAddr
		}
	);
}