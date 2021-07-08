import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  display_name: string;
  email: string;
  id: string;
}

export interface AuthState {
  token: string;
  user: User;
}

const initialState: AuthState = {
  token: '',
  user: {
    display_name: '',
    email: '',
    id: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: ({ token }, action: PayloadAction<string>) => {
      token = action.payload;
    },
    setUser: ({ user }, action: PayloadAction<User>) => {
      user = action.payload;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
