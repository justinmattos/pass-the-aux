require('dotenv').config();
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
export default Buffer.from(`${client_id}:${client_secret}`).toString('base64');
