import axios from 'axios';
import { Request, Response, NextFunction, Router } from 'express';
import { errorCreator, generateRandomString } from '../utils/index';

require('dotenv').config();
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const buffer = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

const router = Router();

const stateKey = 'spotify_auth_state';

// This router is mounted at /login

// GET /login
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';
  const query = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state,
  });
  const url = 'https://accounts.spotify.com/authorize?' + query.toString();
  res.redirect(url);
});

// GET /callback - for Spotify to send the redirect
router.get('/callback', (req: Request, res: Response, next: NextFunction) => {
  const { code, error, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state !== storedState || state === null) {
    next(errorCreator('state_mismatch', 409));
  } else {
    res.clearCookie(stateKey);
    if (error) {
      next(errorCreator(error.toString(), 409));
    } else {
      axios
        .post('https://accounts.spotify.com/api/token', null, {
          headers: { Authorization: 'Basic ' + buffer },
          params: {
            grant_type: 'authorization_code',
            code,
            redirect_uri,
          },
        })
        .then(({ data: { refresh_token } }) => {
          res.redirect(`/#/?token=${refresh_token}`);
        })
        .catch((error) => next(errorCreator(error.toString(), 409)));
    }
  }
});

// POST /refresh
router.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body;
  axios
    .post('https://accounts.spotify.com/api/token', null, {
      headers: { Authorization: 'Basic ' + buffer },
      params: {
        grant_type: 'refresh_token',
        refresh_token,
      },
    })
    .then(({ data: { access_token } }) => {
      return axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: 'Bearer ' + access_token },
      });
    })
    .then(({ data }) => {
      res.send({ user: data });
    })
    .catch((error) => next(errorCreator(error.toString(), 409)));
});

export default router;
