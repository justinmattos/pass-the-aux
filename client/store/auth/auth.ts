import { combineReducers, Reducer } from 'redux';
import { Action } from '../types';

const SET_TOKEN = 'SET_TOKEN';

interface TokenAction extends Action {
  token: string;
}

export const setToken = (token: string): TokenAction => ({
  token,
  type: SET_TOKEN,
});

const tokenReducer = (state = '', { token, type }: TokenAction) => {
  if (type === SET_TOKEN) return token;
  return state;
};

const SET_USER = 'SET_USER';

interface User {
  fullName: string;
  firstName: string;
  lastName: string;
}

interface UserAction extends Action {
  user: User;
}

export const setUser = (user: User): UserAction => ({ user, type: SET_USER });

const initialState: User = {
  fullName: '',
  firstName: '',
  lastName: '',
};

const userReducer = (state: User, { user, type }: UserAction) => {
  if (type === SET_USER) return user;
  return state;
};

export default combineReducers({ token: tokenReducer, user: userReducer });
