import axios from 'axios';
import { Router, Request, Response, NextFunction } from 'express';

import { errorCreator, requireRefreshToken } from '../../utils';

// This router is mounted at /api/user
const router = Router();

// GET /user returns the currently logged in user data from the Spotify API
router.get(
  '/',
  requireRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    const {
      headers: { authorization: access_token },
    } = req;
    axios
      .get('https://api.spotify.com/v1/me', {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      .then(({ data }) => {
        res.send({ user: data });
      })
      .catch((error) => next(errorCreator(error.toString(), 409)));
  }
);

export default router;
