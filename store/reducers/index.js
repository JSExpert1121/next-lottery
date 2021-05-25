import { combineReducers } from 'redux';

import userReducer from './user';
import gameReducer from './game';


export default combineReducers({
  user: userReducer,
  game: gameReducer
});