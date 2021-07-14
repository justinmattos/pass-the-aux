import React from 'react';
import { useTypedSelector } from '../../hooks';

// For some reason, dispatching to the store is just not working here and I may need to vastly simplify the player object, filtering information at the API router level and only sending the essentials to the client.

const Player = () => {
  const { player, styleOpt } = useTypedSelector((state) => ({
    player: state.player.value,
    styleOpt: state.styleOpt.value,
  }));

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
        <h3>Currently playing with</h3>
        <img
          src={`public/spotify/logos/logo-${styleOpt}.png`}
          height="40rem"
          style={{ padding: '1.5rem 0' }}
        />
      </div>
      {player && player.is_playing ? (
        <div>
          <img
            src={player.item?.album?.images[0].url}
            style={{ width: 'calc(100%)', paddingBottom: '0.5rem' }}
          />
          <h3>{player.item?.name}</h3>
          <div>
            {player.item?.artists.map((artist: any) => artist?.name).join(', ')}
          </div>
          <div>{player.item.album.name}</div>
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
