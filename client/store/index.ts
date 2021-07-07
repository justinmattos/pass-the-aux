import { combineReducers, createStore } from 'redux';

import authReducer, { setToken, setUser } from './auth/auth';

const reducer = combineReducers({ authReducer });

export default createStore(reducer);

export const actionCreators = {
  setAuth: {
    setToken,
    setUser,
  },
};
