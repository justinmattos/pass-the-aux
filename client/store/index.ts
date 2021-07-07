import { combineReducers, createStore } from 'redux';

import auth, { setAuth } from './auth';
const { setToken, setUser } = setAuth;

import socket, { setSocket } from './socket';

const reducer = combineReducers({ auth, socket });

export default createStore(reducer);

export const actionCreators = {
  setSocket,
  setToken,
  setUser,
};
