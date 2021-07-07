import { combineReducers, createStore } from 'redux';

import auth, { setAuth } from './auth';

const reducer = combineReducers({ auth });

export default createStore(reducer);

export const actionCreators = {
  setAuth,
};
