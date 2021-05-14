import * as ActionTypes from 'store/action-types';
const initState = {
  user: null,
  profile: null,
  token: null
};

const userReducer = (state = initState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.AUTH_LOGIN_SUCCESS:
      return { ...state, profile: payload };
    case ActionTypes.AUTH_LOGIN_FAILED:
      return { ...initState }
    default:
      return state;
  }
}

export default userReducer;