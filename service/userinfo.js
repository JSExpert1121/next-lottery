import { API_BASE_URL, SEC_TOKEN, BRAND_ID } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/userinfo`;

export const signUp = async ({ firstName, lastName, email, phone, password, affiliateID }) => {
	const body = {
		BrandID: BRAND_ID,
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		PhoneNumber: phone,
		Password: password
	}
	if (affiliateID) {
		body.affiliateID = affiliateID;
	}
	return await authPost(
		`${BASE_URL}/signup`,
		SEC_TOKEN,
		body
	);
}

export const login = async (email, password) => {
	return await authPost(
		`${BASE_URL}/login`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			Email: email,
			Password: password
		}
	);
}

export const getMoneyBalance = async (memberID) => {
	return await authPost(
		`${BASE_URL}/get-member-money-balance`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID
		}
	);
}

export const getPersonalDetailsByID = async (memberID) => {
	return await authPost(
		`${BASE_URL}/get-personal-details-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID
		}
	);
}

export const getPersonalDetailsByEmail = async (email) => {
	return await authPost(
		`${BASE_URL}/get-personal-details-by-email`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			Email: email
		}
	);
}

export const updatePersonalDetails = async (
	email, firstName, lastName,
	memberID, phone, mobile, countryCode,
	address, city, state, zipCode, birthday
) => {
	return await authPost(
		`${BASE_URL}/update-personal-details`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			Email: email,
			FirstName: firstName,
			LastName: lastName,
			PhoneNumber: phone,
			MobileNumber: mobile,
			countryCode: countryCode,
			Address: address,
			City: city,
			State: state,
			ZipCode: zipCode,
			DateOfBirth: birthday
		}
	);
}

export const updatePassword = async (email, password, memberID) => {
	return await authPost(
		`${BASE_URL}/update-password`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			Email: email,
			Password: password
		}
	);
}

export const getTransactionsByID = async (page, pageSize, memberID) => {
	return await authPost(
		`${BASE_URL}/get-transactions-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			PageNumber: page,
			PageSize: pageSize
		}
	);
}

export const getTransactionAmountByID = async (transID, memberID) => {
	return await authPost(
		`${BASE_URL}/get-member-transaction-amount-by-id`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			TransactionId: transID
		}
	);
}

export const getPurchaseDetails = async (sessionID, pmCounter) => {
	return await authPost(
		`${BASE_URL}/get-member-purchase-complete-details`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			SessionID: sessionID,
			ProductManagementCounter: pmCounter
		}
	);
}

export const getCreditCardMethodByID = async (isDef, memberID) => {
	return await authPost(
		`${BASE_URL}/get-credit-card-methods-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			IsDefault: !!isDef
		}
	);
}

export const updateCreditCard = async (
	payID, cardType, holderName, cardNo,
	CVV, expireDate, memberID
) => {
	return await authPost(
		`${BASE_URL}/add-update-credit-card`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			ID: payID,
			CardType: cardType,
			CardHolderName: holderName,
			CreditCardNumber: cardNo,
			CVV: CVV,
			ExpirationDate: expireDate
		}
	);
}

export const deleteCreditCard = async (payID, memberID) => {
	return await authPost(
		`${BASE_URL}/update-credit-card`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			MemberID: memberID,
			ID: payID,
			IsActive: false,
			IsDefault: false
		}
	);
}

export const verifyResetPwdLink = async (brandID, encryptedQuery) => {
	return await authPost(
		`${BASE_URL}/get-member-money-balance`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			EncryptedQueryString: encryptedQuery
		}
	);
}

export const resetPasswordCommit = async (email, oldPwd, newPwd) => {
	return await authPost(
		`${BASE_URL}/get-member-money-balance`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			Email: email,
			OldPassword: oldPwd,
			NewPassword: newPwd
		}
	);
}

export const getUserBySysSessionId = async (sysSessionId) => {
	return await authPost(
		`${BASE_URL}//get-personal-details-by-sessionid`,
		SEC_TOKEN,
		{
			BrandID: BRAND_ID,
			SessionId: sysSessionId
		}
	);
}
