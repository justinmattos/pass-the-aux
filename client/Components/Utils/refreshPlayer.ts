import axios from 'axios';
import { AppDispatch, setPlayer } from '../../store';
import { Player } from '../../store/slices/player';

const refreshPlayer = ({
  dispatch,
  token,
}: {
  dispatch: AppDispatch;
  token: string;
}): void => {
  axios
    .get('/api/player', { headers: { authorization: token } })
    .then(({ status, data: { player: fetchedPlayer } }) => {
      if (status === 200 && fetchedPlayer.currently_playing_type === 'track') {
        const playerToDispatch: Player = {
          currently_playing_type: 'track',
          is_playing: fetchedPlayer.is_playing,
          item: {
            album: {
              name: fetchedPlayer.item.album.name,
              images: fetchedPlayer.item.album.images,
            },
            artists: fetchedPlayer.item.artists.map(
              ({ name }: { name: string }) => ({ name })
            ),
            duration_ms: fetchedPlayer.item.duration_ms,
            name: fetchedPlayer.item.name,
          },
          progress_ms: fetchedPlayer.progress_ms,
          timestamp: fetchedPlayer.timestamp,
        };
        console.log(fetchedPlayer);
        dispatch(setPlayer({ player: playerToDispatch }));
        if (fetchedPlayer.is_playing) {
          setTimeout(
            () => refreshPlayer({ dispatch, token }),
            fetchedPlayer.item?.duration_ms - fetchedPlayer.progress_ms + 100
          );
        }
      }
    })
    .catch((err) => console.error(err));
};

export default refreshPlayer;
