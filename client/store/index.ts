import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth, { setToken, setUser } from './slices/auth';
import menu, { expand, collapse } from './slices/menu';
import socket, { setSocket } from './slices/socket';
import styleOpt, { setLight, setDark } from './slices/styleOpt';

const store = configureStore({
  reducer: {
    auth,
    menu,
    socket,
    styleOpt,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { expand, collapse, setDark, setLight, setSocket, setToken, setUser };
