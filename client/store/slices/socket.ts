import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import type { Socket } from 'socket.io-client';

export interface SocketState {
  readonly value: Socket;
}

const initialState: SocketState = {
  value: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | null>) => {
      state.value = castDraft(action.payload);
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
