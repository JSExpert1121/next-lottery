import { API_BASE_URL, SEC_TOKEN } from './config';
import { authPost } from './base';

const BASE_URL = `${API_BASE_URL}/userinfo`;

export const signUp = async (
	firstName, lastName, email, phone,
	mobile, affiliateID, brandID
) => {
	return await authPost(
		`${BASE_URL}/signup`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			PhoneNumber: phone,
			MobileNumber: mobile,
			AffiliateID: affiliateID
		}
	);
}

export const login = async (email, password, brandID) => {
	return await authPost(
		`${BASE_URL}/login`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			Email: email,
			Password: password
		}
	);
}

export const getMoneyBalance = async (memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-member-money-balance`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID
		}
	);
}

export const getPersonalDetailsByID = async (memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-personal-details-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID
		}
	);
}

export const getPersonalDetailsByEmail = async (email, brandID) => {
	return await authPost(
		`${BASE_URL}/get-personal-details-by-email`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			Email: email
		}
	);
}

export const updatePersonalDetails = async (
	email, password, firstName, lastName,
	memberID, phone, mobile, countryCode,
	address, city, state, zipCode, birthday, brandID
) => {
	return await authPost(
		`${BASE_URL}/update-personal-details`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			Email: email,
			Password: password,
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

export const updatePassword = async (email, password, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/update-password`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			Email: email,
			Password: password
		}
	);
}

export const getTransactionsByID = async (page, pageSize, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-transactions-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			PageNumber: page,
			PageSize: pageSize
		}
	);
}

export const getTransactionAmountByID = async (transID, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-member-transaction-amount-by-id`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			TransactionId: transID
		}
	);
}

export const getPurchaseDetails = async (sessionID, pmCounter, brandID) => {
	return await authPost(
		`${BASE_URL}/get-member-purchase-complete-details`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			SessionID: sessionID,
			ProductManagementCounter: pmCounter
		}
	);
}

export const getCreditCardMethodByID = async (isDef, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/get-credit-card-methods-by-memberid`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			MemberID: memberID,
			IsDefault: !!isDef
		}
	);
}

export const updateCreditCard = async (
	payID, cardType, holderName, cardNo,
	CVV, expireDate, memberID, brandID
) => {
	return await authPost(
		`${BASE_URL}/add-update-credit-card`,
		SEC_TOKEN,
		{
			BrandID: brandID,
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

export const deleteCreditCard = async (payID, memberID, brandID) => {
	return await authPost(
		`${BASE_URL}/update-credit-card`,
		SEC_TOKEN,
		{
			BrandID: brandID,
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
			BrandID: brandID,
			EncryptedQueryString: encryptedQuery
		}
	);
}

export const resetPasswordCommit = async (email, brandID, oldPwd, newPwd) => {
	return await authPost(
		`${BASE_URL}/get-member-money-balance`,
		SEC_TOKEN,
		{
			BrandID: brandID,
			Email: email,
			OldPassword: oldPwd,
			NewPassword: newPwd
		}
	);
}
