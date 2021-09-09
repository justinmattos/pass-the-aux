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
    axios
      .get('https://api.spotify.com/v1/me/player', {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      .then(({ status, data }) => {
        if (status === 204) res.sendStatus(204);
        else res.send({ player: data });
      })
      .catch((error) => next(error));
  }
);

router.put(
  '/',
  requireRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    const {
      headers: { authorization: access_token },
      body: { payload },
    } = req;
    let url = 'https://api.spotify.com/v1/me/player';
    const body: { device_ids?: string[] } = {},
      params: {
        state?: boolean | 'track' | 'context' | 'off';
        volume_percent?: number;
      } = {};
    switch (payload.action) {
      case 'transfer':
        body.device_ids = [payload.device_id];
        break;
      case 'repeat':
        params.state = payload.state;
        url += '/repeat';
        break;
      case 'volume':
        params.volume_percent = payload.volume_percent;
        url += '/volume';
        break;
      case 'shuffle':
        params.state = payload.state;
        break;
      default:
        url += `/${payload.action}`;
        break;
    }
    axios
      .put(url, body, {
        params,
        headers: { Authorization: 'Bearer ' + access_token },
      })
      .then(({ status }) => res.sendStatus(status))
      .catch((error) => next(error));
  }
);

router.post(
  '/',
  requireRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    const {
      headers: { authorization: access_token },
      body: { payload },
    } = req;
    let url = 'https://api.spotify.com/v1/me/player';
    const params: { uri?: string } = {};
    if (payload.action === 'queue') params.uri = payload.uri;
    url += `/${payload.action}`;
    axios
      .post(url, null, {
        params,
        headers: { Authorization: 'Bearer ' + access_token },
      })
      .then(({ status }) => res.sendStatus(status))
      .catch((error) => next(error));
  }
);

export default router;
