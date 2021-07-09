import { createSlice } from '@reduxjs/toolkit';

export interface StyleState {
  value: 'dark' | 'light';
}

const initialState: StyleState = {
  value: 'light',
};

export const styleSlice = createSlice({
  name: 'styleOpt',
  initialState,
  reducers: {
    setDark: (state) => {
      state.value = 'dark';
    },
    setLight: (state) => {
      state.value = 'light';
    },
  },
});

export const { setDark, setLight } = styleSlice.actions;

export default styleSlice.reducer;
