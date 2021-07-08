import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  value: 'dark' | 'light';
}

const initialState: ThemeState = {
  value: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDark: ({ value }) => {
      value = 'dark';
    },
    setLight: ({ value }) => {
      value = 'light';
    },
  },
});

export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;
