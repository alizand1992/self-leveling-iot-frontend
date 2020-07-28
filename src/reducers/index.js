import { combineReducers } from 'redux';
import { userReducer } from './Users';

export const reducers = combineReducers({
  user: userReducer,
});
