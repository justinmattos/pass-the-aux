import app from './app';
import createSocketServer from './socket';

const PORT: number = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
createSocketServer(server);
