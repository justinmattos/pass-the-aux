import React from 'react';
import { useTypedSelector } from '../../hooks';

import {
  PlayerAlbumImg,
  PlayerDiv,
  PlayerHeaderDiv,
  PlayerHeaderImg,
} from '../../styles';

const Player = () => {
  const { player, styleOpt } = useTypedSelector((state) => ({
    player: state.player.value,
    styleOpt: state.styleOpt.value,
  }));

  return (
    <PlayerDiv>
      <PlayerHeaderDiv>
        <h3>Currently playing with</h3>
        <PlayerHeaderImg
          src={`public/spotify/logos/logo-${styleOpt}.png`}
          height="40rem"
        />
      </PlayerHeaderDiv>
      {player && player.item.name ? (
        <div>
          <PlayerAlbumImg src={player.item?.album?.images[0].url} />
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
    </PlayerDiv>
  );
};

export default Player;
