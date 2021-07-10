import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
  expanded: boolean;
}

const initialState: MenuState = {
  expanded: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    expand: (state) => {
      state.expanded = true;
    },
    collapse: (state) => {
      state.expanded = false;
    },
  },
});

export const { expand, collapse } = menuSlice.actions;

export default menuSlice.reducer;
