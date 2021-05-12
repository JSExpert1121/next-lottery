import { API_BASE_URL, SEC_TOKEN } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/playlottery`;

export const getDrawsTickets = (brandID, memberID, pageNumber) => {
	return await authPost(
		`${BASE_URL}/get-draws-tickets-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			PageNumber: pageNumber
		}
	);
}

export const insertFreeProduct = (memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/insert-member-free-product`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID
		}
	);
}

export const insertProductsWithDraws = (type, selNumber, numDraws, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/insert-members-products-with-draws`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			LotteryType: type,
			SelectedNumbers: selNumber,
			NumberOfDraws: numDraws
		}
	);
}

export const insertMemberGroups = (type, productID, numDraws, numGroups) => {
	return await authPost(
		`${BASE_URL}/insert-members-groups`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			LotteryType: type,
			ProductID: productID,
			NumberOfGroups: numGroups,
			NumberOfDraws: numDraws
		}
	);
}

export const getDrawsByID = (page, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-draws-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			PageNumber: page
		}
	);
}

export const getFreeTicket = (memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-member-free-ticket`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID
		}
	);
}

export const getProductsByID = (page, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-products-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			PageNumber: page
		}
	);
}

export const getBtcNavidadNumbers = (type, numCount, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-btc-navidad-numbers`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			LotteryType: type,
			NumbersCount: numCount
		}
	);
}

export const getNavidadNumbers = (lt) => {
	return await authPost(
		`${BASE_URL}/get-navidad-numbers`,
		SEC_TOKEN,
		{
			lt: lt
		}
	);
}

export const insertNavidadNumbers = (lt, productID) => {
	return await authPost(
		`${BASE_URL}/insert-navidad-numbers`,
		SEC_TOKEN,
		{
			lt: lt,
			ProductID: productID
		}
	);
}

export const selectQuickPick = (type, shares, bta, sub, prc) => {
	return await authPost(
		`${BASE_URL}/quick-pick-select`,
		SEC_TOKEN,
		{
			LotteryType: type,
			Shares: shares,
			BTA: bta,
			Sub: sub,
			Prc: prc
		}
	);
}