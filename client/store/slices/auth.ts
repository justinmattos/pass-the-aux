import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SpotifyImage {
  height: string;
  url: string;
  width: string;
}

export interface User {
  display_name: string;
  email: string;
  id: string;
  images: SpotifyImage[];
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
    images: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
