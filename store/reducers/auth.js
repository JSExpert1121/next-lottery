import * as ActionTypes from 'store/action-types';
const initState = {};

const authReducer = (state = initState, action) => {
	const { payload } = action;
	switch (action.type) {
		case ActionTypes.STORE_CREDENTIALS:
			return { ...payload };
		case ActionTypes.CLEAR_CREDENTIALS:
			return initState;
		default:
			return state;
	}
}

export default authReducer;