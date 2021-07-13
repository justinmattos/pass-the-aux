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

// export interface ContextObject {
//   external_urls: {
//     spotify: string;
//   };
//   href: string;
//   type: 'album' | 'playlist' | 'show' | 'artist';
//   uri: string;
// }

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

type CurrentlyPlayingType = 'track' | 'episode' | 'ad' | 'unknown';

type ItemMap = {
  track: TrackObject;
  episode: EpisodeObject;
  ad: null;
  unknown: null;
};

export interface PlayerState<T extends CurrentlyPlayingType> {
  actions: DisallowsObject;
  currently_playing_type: T;
  device: DeviceObject;
  is_playing: boolean;
  item: T extends 'track'
    ? TrackObject
    : T extends 'episode'
    ? EpisodeObject
    : null;
  progress_ms: number;
  repeat_state: string;
  shuffle_state: string;
  timestamp: string;
}

const initialState: PlayerState<CurrentlyPlayingType> = {
  actions: null,
  currently_playing_type: 'unknown',
  device: null,
  is_playing: false,
  item: null,
  progress_ms: 0,
  repeat_state: null,
  shuffle_state: null,
  timestamp: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerWithTrack: (
      state,
      action: PayloadAction<{
        player: PlayerState<'track'>;
      }>
    ) => {
      state = action.payload.player;
    },
    setPlayerWithEpisode: (
      state,
      action: PayloadAction<{
        player: PlayerState<'episode'>;
      }>
    ) => {
      state = action.payload.player;
    },
    setPlayerWithout: (
      state: PlayerState<CurrentlyPlayingType>,
      action: PayloadAction<{
        player: PlayerState<'ad' | 'unknown'>;
      }>
    ) => {
      state = action.payload.player;
    },
  },
});

export const {
  setPlayerWithEpisode,
  setPlayerWithTrack,
  setPlayerWithout,
} = playerSlice.actions;

export default playerSlice.reducer;
