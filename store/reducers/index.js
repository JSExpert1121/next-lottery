import { combineReducers } from 'redux';

import userReducer from './user';
import gameReducer from './game';
import authReducer from './auth';


export default combineReducers({
  user: userReducer,
  game: gameReducer,
  auth: authReducer
});