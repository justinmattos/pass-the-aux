import axios from 'axios';
import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import {
  setPlayerWithEpisode,
  setPlayerWithTrack,
  setPlayerWithout,
} from '../../store';
import { PlayerState } from '../../store/slices/player';

// For some reason, dispatching to the store is just not working here and I may need to vastly simplify the player object, filtering information at the API router level and only sending the essentials to the client.

const Player = () => {
  const { player, styleOpt, token } = useTypedSelector((state) => ({
    player: state.player,
    styleOpt: state.styleOpt.value,
    token: state.auth.token,
  }));
  const dispatch = useTypedDispatch();

  const refreshPlayer = () => {
    axios
      .get('/api/player', { headers: { authorization: token } })
      .then(({ data: { player: fetchedPlayer } }) => {
        const {
          actions,
          currently_playing_type,
          device,
          is_playing,
          item,
          progress_ms,
          repeat_state,
          shuffle_state,
          timestamp,
        } = fetchedPlayer;
        const playerToDispatch: PlayerState<typeof currently_playing_type> = {
          actions,
          currently_playing_type,
          device,
          is_playing,
          item,
          progress_ms,
          repeat_state,
          shuffle_state,
          timestamp,
        };
        switch (currently_playing_type) {
          case 'track':
            dispatch(setPlayerWithTrack({ player: playerToDispatch }));
            break;
          case 'episode':
            dispatch(setPlayerWithEpisode({ player: playerToDispatch }));
            break;
          case 'ad' || 'unknown':
            dispatch(setPlayerWithout({ player: playerToDispatch }));
            break;
        }
        setTimeout(
          refreshPlayer,
          fetchedPlayer.item?.duration_ms - fetchedPlayer.progress_ms + 100
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token) {
      refreshPlayer();
    }
  }, [token]);

  return (
    <div
      style={{
        padding: '0 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>Currently playing with</div>
        <img
          src={`public/spotify/logos/logo-${styleOpt}.png`}
          height="40rem"
          style={{ padding: '1.5rem 0' }}
        />
      </div>
      {player && player.item ? (
        <div>
          <img
            src={
              player.currently_playing_type === 'track'
                ? player.item?.album?.images[0].url
                : player.item?.images[0].url
            }
            style={{ width: 'calc(100% - 2rem)', padding: '0 1rem' }}
          />
          <div>{player.item?.name}</div>
          <div>
            {player.currently_playing_type === 'track'
              ? player.item?.artists
                  .map((artist: any) => artist?.name)
                  .join(', ')
              : player.item?.show?.name}
          </div>
          {player.currently_playing_type === 'track' ? (
            <div>{player.item.album.name}</div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div style={{ padding: '0 1rem' }}>
          Either nothing is playing on your account or Spotify cannot supply
          adequate information about what you are listening to
        </div>
      )}
    </div>
  );
};

export default Player;
