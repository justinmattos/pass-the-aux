import { XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useTypedSelector } from '../../hooks';
import {
  Button,
  IconContainer,
  RoomsDiv,
  NoRoomDiv,
  LightboxContainer,
  LightboxContent,
} from '../../styles';

const Rooms = () => {
  const { socket, styleOpt } = useTypedSelector((state) => ({
    socket: state.socket.value,
    styleOpt: state.styleOpt.value,
  }));

  const theme = useTheme();

  interface LightboxState {
    visible: boolean;
    version?: 'Create' | 'Join';
  }
  const [lightbox, setLightbox] = useState<LightboxState>({ visible: false });

  const openLightbox = (version: LightboxState['version']): void => {
    setLightbox({
      version,
      visible: true,
    });
  };

  const buttonOpts = {
    whileHover: {
      scale: 1.25,
    },
  };

  return (
    <RoomsDiv>
      <h3>Current Room</h3>
      {socket ? (
        <div></div>
      ) : (
        <NoRoomDiv>
          <div>
            You are not currently in a room. Join an existing room or create a
            new one to share Spotify playback.
          </div>
          <Button onClick={() => openLightbox('Create')} {...buttonOpts}>
            Create a Room
          </Button>
          <Button onClick={() => openLightbox('Join')} {...buttonOpts}>
            Join a Room
          </Button>
          <LightboxContainer
            initial="hidden"
            animate={lightbox.visible ? 'visible' : 'hidden'}
            variants={{
              visible: { z: 1 },
              hidden: { z: -1 },
            }}
          >
            <LightboxContent
              initial="hidden"
              animate={lightbox.visible ? 'visible' : 'hidden'}
              variants={{
                visible: { scale: 1 },
                hidden: { scale: 0 },
              }}
            >
              <IconContainer>
                <XIcon
                  onClick={() => setLightbox({ visible: false })}
                  height="1rem"
                  width="1rem"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '2rem',
                  }}
                />
              </IconContainer>
              <h3>{lightbox.version} a Room</h3>
            </LightboxContent>
          </LightboxContainer>
        </NoRoomDiv>
      )}
    </RoomsDiv>
  );
};

export default Rooms;
