import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { useTypedSelector } from '../../hooks';
import { Button, RoomsDiv, NoRoomDiv } from '../../styles';
import { Lightbox } from '../Utils';

const Rooms = () => {
  const { socket } = useTypedSelector((state) => ({
    socket: state.socket.value,
  }));

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
    <>
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
            <Lightbox
              visible={lightbox.visible}
              Content={
                lightbox.visible
                  ? () => {
                      if (lightbox.version === 'Create') return <CreateRoom />;
                      if (lightbox.version === 'Join') return <JoinRoom />;
                    }
                  : () => <></>
              }
              closeFunc={() => setLightbox({ visible: false })}
            />
          </NoRoomDiv>
        )}
      </RoomsDiv>
    </>
  );
};

export default Rooms;
