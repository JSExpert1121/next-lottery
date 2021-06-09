import * as ActionTypes from 'store/action-types';
const initState = {
  profile: null,
  balance: null,
  transactions: [],
  tickets: [],
  products: []
};

const userReducer = (state = initState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.AUTH_USER_LOGGED_IN:
    case ActionTypes.USER_PROFILE_SET:
      return { ...state, profile: payload };
    case ActionTypes.AUTH_USER_LOGGED_OUT:
      return { ...initState }
    case ActionTypes.USER_BALANCE_SET:
      return { ...state, balance: payload };
    case ActionTypes.USER_TRANSACTIONS:
      return { ...state, transactions: payload };
    case ActionTypes.USER_TICKETS:
      return { ...state, tickets: payload };
    case ActionTypes.USER_PRODIUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
}

export default userReducer;