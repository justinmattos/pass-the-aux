import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DisallowsObject {
  interrupting_playback?: boolean;
  pausing?: boolean;
  resuming?: boolean;
  seeking?: boolean;
  skipping_next?: boolean;
  skipping_prev?: boolean;
  toggling_repeat_context?: boolean;
  toggling_shuffle?: boolean;
  transferring_playback?: boolean;
}

export interface ContextObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  type: 'album' | 'playlist' | 'show' | 'artist';
  uri: string;
}

export interface DeviceObject {
  id: 'string';
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  volume_percent: number;
}

export interface ArtistObject {}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface AlbumObject {
  images: Image[];
  name: string;
}

export interface TrackObject {
  album: AlbumObject;
  artists: ArtistObject[];
  duration_ms: number;
  name: string;
  track_number: number;
}

export interface EpisodeObject {
  duration_ms: number;
  images: Image[];
  name: string;
  show: {
    name: string;
  };
}

export interface PlayerState {
  actions: DisallowsObject;
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
  device: DeviceObject;
  is_playing: true;
  item: TrackObject | EpisodeObject;
  progress_ms: number;
  repeat_state: string;
  shuffle_state: string;
  timestamp: string;
}

const initialState: PlayerState = null;

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<PlayerState>) => {
      state = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
