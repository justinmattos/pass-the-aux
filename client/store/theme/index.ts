import { Action } from '../types';

const SET_THEME = 'SET_THEME';

interface ThemeAction extends Action {
  theme: 'dark' | 'light';
}

export const setTheme = (theme: 'light' | 'dark'): ThemeAction => ({
  theme,
  type: SET_THEME,
});

const initialState: 'light' | 'dark' = 'light';

export default (state = initialState, { theme, type }: ThemeAction) => {
  if (type === SET_THEME) return theme;
  return state;
};
