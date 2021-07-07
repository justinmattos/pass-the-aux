import { Socket } from 'socket.io-client';
import { Action } from '../types';

const SET_SOCKET = 'SET_SOCKET';

interface SocketAction extends Action {
  socket: Socket;
}

export const setSocket = (socket: Socket): SocketAction => ({
  socket,
  type: SET_SOCKET,
});

export default (state = null, { socket, type }: SocketAction) => {
  if (type === SET_SOCKET) return socket;
  return state;
};
