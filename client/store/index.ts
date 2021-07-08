import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth, { setToken, setUser } from './slices/auth';
import socket, { setSocket } from './slices/socket';
import theme, { setLight, setDark } from './slices/theme';

const store = configureStore({
  reducer: {
    auth,
    socket,
    theme,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { setDark, setLight, setSocket, setToken, setUser };
