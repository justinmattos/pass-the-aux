import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { changeSong, modifyPlayback, refreshPlayer } from '../../utils';
import { ControllerDiv } from '../../styles';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import { useTheme } from 'styled-components';

const Controller = () => {
  const { player, styleOpt, token } = useTypedSelector((state) => ({
    player: state.player.value,
    styleOpt: state.styleOpt.value,
    token: state.auth.token,
  }));
  const dispatch = useTypedDispatch();

  const theme = useTheme();

  useEffect(() => {
    if (token) {
      refreshPlayer({ dispatch, token });
    }
  }, [token]);

  const iconOpts = {
    color: theme[styleOpt].navText,
    width: '2rem',
    height: '2rem',
  };

  return (
    <ControllerDiv>
      <ChevronLeftIcon
        {...iconOpts}
        onClick={() => {
          changeSong({ dispatch, token, payload: { action: 'previous' } });
        }}
      />
      {player.is_playing ? (
        <PauseIcon
          {...iconOpts}
          onClick={() => {
            modifyPlayback({ dispatch, token, payload: { action: 'pause' } });
          }}
        />
      ) : (
        <PlayIcon
          {...iconOpts}
          onClick={() => {
            modifyPlayback({ dispatch, token, payload: { action: 'play' } });
          }}
        />
      )}
      <ChevronRightIcon
        {...iconOpts}
        onClick={() => {
          changeSong({ dispatch, token, payload: { action: 'next' } });
        }}
      />
    </ControllerDiv>
  );
};

export default Controller;
