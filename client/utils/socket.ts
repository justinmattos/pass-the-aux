import { io, Socket } from 'socket.io-client';

export default (token: string, room: string): Socket => {
  const socket = io('users', { path: 'socket', auth: { token, room } });
  socket.on('message', console.log);
  return socket;
};
