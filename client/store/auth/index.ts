import { combineReducers } from 'redux';

import token, { setToken } from './token';
import user, { setUser } from './user';

export default combineReducers({ token, user });
export const setAuth = {
  setToken,
  setUser,
};
