import * as ActionTypes from 'store/action-types';
const initState = {
  user: null,
  profile: null,
  token: null,
  balance: null
};

const userReducer = (state = initState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.AUTH_USER_LOGGED_IN:
      return { ...state, profile: payload };
    case ActionTypes.AUTH_USER_LOGGED_OUT:
      return { ...initState }
    case ActionTypes.USER_BALANCE_SET:
      return { ...state, balance: payload };
    default:
      return state;
  }
}

export default userReducer;