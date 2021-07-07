import { Server as SocketServer } from 'socket.io';
import { Server } from 'node:http';

export default (server: Server): SocketServer => {
  const io = new SocketServer(server);
  return io;
};
