import axios from 'axios';
import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { setPlayer } from '../../store';

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
      .then(({ data: { player } }) => {
        console.log(player);
        dispatch(setPlayer(player));
        setTimeout(
          refreshPlayer,
          player.item.duration_ms - player.progress_ms + 100
        );
      });
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
