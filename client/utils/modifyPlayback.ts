import axios from 'axios';
import { AppDispatch } from '../store';
import refreshPlayer from './refreshPlayer';

export type SoloActions = 'play' | 'pause';

export type PayloadOptions =
  | {
      action: SoloActions;
    }
  | {
      action: 'transfer';
      device_id: string;
    }
  | {
      action: 'repeat';
      state: 'track' | 'context' | 'off';
    }
  | {
      action: 'volume';
      volume_percent: number;
    }
  | {
      action: 'shuffle';
      state: boolean;
    };

export interface PlaybackOptions {
  dispatch: AppDispatch;
  payload: PayloadOptions;
  token: string;
}

const modifyPlayback = ({ dispatch, payload, token }: PlaybackOptions) => {
  axios
    .put('/api/player', { payload }, { headers: { authorization: token } })
    .then(() => {
      refreshPlayer({ dispatch, token });
    })
    .catch(console.error);
};

export default modifyPlayback;
