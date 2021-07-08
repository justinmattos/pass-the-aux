import { Action } from '../types';

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

export default (state = initialState, { user, type }: UserAction) => {
  if (type === SET_USER) return user;
  return state;
};
