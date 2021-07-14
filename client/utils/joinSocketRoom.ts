import { io, Socket } from 'socket.io-client';

const joinSocketRoom = (password: string, room: string): Socket => {
  const socket = io('users', { path: 'socket', auth: { password, room } });
  socket.on('message', console.log);
  return socket;
};

export default joinSocketRoom;
