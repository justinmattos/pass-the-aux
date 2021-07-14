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
  type: string;
  volume_percent: number;
}

export interface ArtistObject {
  // external_urls: { [key: string]: string };
  // href: string;
  // id: 'string';
  name: string;
  // type: string;
  // uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface AlbumObject {
  // album_type: string;
  // artists: ArtistObject[];
  // available_markets: string[];
  // external_urls: { [key: string]: string };
  // href: string;
  // id: 'string';
  images: Image[];
  name: string;
  // release_date: string;
  // release_date_precision: string;
  // total_tracks: number;
  // type: string;
  // uri: string;
}

export interface TrackObject {
  album: AlbumObject;
  artists: ArtistObject[];
  // available_markets: string[];
  // disc_number: number;
  duration_ms: number;
  // explicit: boolean;
  // external_ids: { [key: string]: string };
  // external_urls: { [key: string]: string };
  // href: string;
  // id: 'string';
  // is_local: boolean;
  name: string;
  // popularity: number;
  // preview_url: string;
  // track_number: number;
  // type: string;
  // uri: string;
}

export interface EpisodeObject {
  duration_ms: number;
  images: Image[];
  name: string;
  show: {
    name: string;
  };
}

type BasePlayerState = {
  // actions: DisallowsObject;
  // context: ContextObject;
  // device: DeviceObject;
  // repeat_state: string;
  // shuffle_state: string;
};

export interface Player {
  currently_playing_type: 'track';
  is_playing: boolean;
  item: TrackObject;
  progress_ms: number;
  timestamp: string;
}

export interface PlayerState {
  value: Player;
}

const intitialValue: Player = {
  // actions: null,
  // context: null,
  currently_playing_type: null,
  // device: null,
  is_playing: false,
  item: {
    album: {
      name: '',
      images: [],
    },
    artists: [
      {
        name: '',
      },
    ],
    duration_ms: 0,
    name: '',
  },
  progress_ms: 0,
  // repeat_state: null,
  // shuffle_state: null,
  timestamp: null,
};

const initialState: PlayerState = {
  value: intitialValue,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<{
        player: Player;
      }>
    ) => {
      state.value = action.payload.player;
    },
  },
});

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
