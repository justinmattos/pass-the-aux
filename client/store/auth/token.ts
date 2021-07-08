import { Action } from '../types';

const SET_TOKEN = 'SET_TOKEN';

interface TokenAction extends Action {
  token: string;
}

export const setToken = (token: string): TokenAction => ({
  token,
  type: SET_TOKEN,
});

const initialState: string = '';

export default (state = initialState, { token, type }: TokenAction) => {
  if (type === SET_TOKEN) return token;
  return state;
};
