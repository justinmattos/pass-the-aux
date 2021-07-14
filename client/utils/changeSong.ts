import axios from 'axios';
import { AppDispatch } from '../store';
import refreshPlayer from './refreshPlayer';

type SoloActions = 'next' | 'previous';

type PayloadOptions =
  | {
      action: SoloActions;
    }
  | {
      action: 'queue';
      uri: string;
    };

export interface SongOptions {
  dispatch: AppDispatch;
  payload: PayloadOptions;
  token: string;
}

const changeSong = ({ dispatch, payload, token }: SongOptions) => {
  axios
    .post('/api/player', { payload }, { headers: { authorization: token } })
    .then(() => {
      refreshPlayer({ dispatch, token });
    })
    .catch(console.error);
};

export default changeSong;
