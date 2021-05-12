import { API_BASE_URL, SEC_TOKEN, BRAND_ID } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/globalinfo`;

export const getLotteryRules = async () => {
	return await authPost(
		`${BASE_URL}/lottery-rules`,
		SEC_TOKEN
	);
}

export const getAllLotteries = async () => {
	return await authPost(
		`${BASE_URL}/get-all-lotteries`,
		SEC_TOKEN
	);
}

export const getAllDraws = async () => {
	return await authPost(
		`${BASE_URL}/get-all-brand-draws`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID
		}
	);
}

export const getLotteriesResults = async () => {
	return await authPost(
		`${BASE_URL}/get-all-lotteries`,
		SEC_TOKEN
	);
}

export const getLottoLastResultsAndPrizes = async (numResults) => {
	return await authPost(
		`${BASE_URL}/get-lotteries-last-results-prizes-brand`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			NumberOfResults: numResults
		}
	);
}

export const getLottoResultsByDate = async (start, end) => {
	return await authPost(
		`${BASE_URL}/get-lotteries-results-by-date`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			StartDate: start,
			EndDate: end
		}
	);
}

export const getLottoLastResults = async () => {
	return await authPost(
		`${BASE_URL}/get-lotteries-last-results`,
		SEC_TOKEN
	);
}

export const getLottoLastResultsPrizes = async () => {
	return await authPost(
		`${BASE_URL}/get-lotteries-last-results-prizes`,
		SEC_TOKEN
	);
}

export const getPricesAndDiscounts = async (numDraws, productID) => {
	return await authPost(
		`${BASE_URL}/get-prices-and-discounts`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			NumberOfDraws: numDraws,
			ProductID: productID
		}
	);
}

export const getGroupPricesAndDiscounts = async () => {
	return await authPost(
		`${BASE_URL}/get-group-prices-and-discounts`,
		SEC_TOKEN,
		{ BrandID: BRAND_ID }
	);
}

export const getPricesByProducts = async (products) => {
	return await authPost(
		`${BASE_URL}/get-prices-by-brand-and-productid`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			ProductIds: products
		}
	);
}

export const getResultsByBrand = async () => {
	return await authPost(
		`${BASE_URL}/get-lotteries-results-by-brand`,
		SEC_TOKEN,
		{ BrandID: BRAND_ID }
	);
}

export const getProductRules = async () => {
	return await authPost(
		`${BASE_URL}/product-rules`,
		SEC_TOKEN,
		{ BrandID: BRAND_ID }
	);
}