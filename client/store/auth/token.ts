import { combineReducers } from 'redux';
import { Action } from '../types';

const SET_TOKEN = 'SET_TOKEN';

interface TokenAction extends Action {
  token: string;
}

export const setToken = (token: string): TokenAction => ({
  token,
  type: SET_TOKEN,
});

export default (state = '', { token, type }: TokenAction) => {
  if (type === SET_TOKEN) return token;
  return state;
};
