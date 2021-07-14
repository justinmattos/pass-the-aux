import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { errorCreator, requireRefreshToken } from '../../utils';

// This router is mounted at /api/player
const router = Router();

// GET /api/player returns the player information for the currently logged in user
router.get(
  '/',
  requireRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    const {
      headers: { authorization: access_token },
    } = req;
    console.log(access_token);
    axios
      .get('https://api.spotify.com/v1/me/player', {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      .then(({ status, data }) => {
        if (status === 204) res.sendStatus(204);
        res.send({ player: data });
      })
      .catch((error) => {
        console.error(error);
        next(errorCreator(error, 409));
      });
  }
);

export default router;
