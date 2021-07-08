import { combineReducers, createStore } from 'redux';

import auth, { setAuth } from './auth';
const { setToken, setUser } = setAuth;

import socket, { setSocket } from './socket';
import theme, { setTheme } from './theme';

const reducer = combineReducers({ auth, socket, theme });

export default createStore(reducer);

export const actionCreators = {
  setSocket,
  setToken,
  setTheme,
  setUser,
};
