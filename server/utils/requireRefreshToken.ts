import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

import { buffer } from './';

const requireRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization: refresh_token },
  } = req;
  axios
    .post('https://accounts.spotify.com/api/token', null, {
      headers: { Authorization: 'Basic ' + buffer },
      params: {
        grant_type: 'refresh_token',
        refresh_token,
      },
    })
    .then(({ data: { access_token } }) => {
      req.headers.authorization = access_token;
      next();
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
};

export default requireRefreshToken;
