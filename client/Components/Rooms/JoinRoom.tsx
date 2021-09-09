import React from 'react';
import { useTypedSelector } from '../../hooks';
import { Button, CreateOrJoinRoomDiv } from '../../styles';

const JoinRoom = () => {
  return (
    <CreateOrJoinRoomDiv>
      <h3 style={{ alignSelf: 'center' }}>Join a Room</h3>
      <label>
        Enter the room name:
        <input />
      </label>
      <label>
        Enter the room password:
        <input type="password" />
      </label>
      <Button onClick={() => {}} style={{ alignSelf: 'center' }}>
        Submit
      </Button>
    </CreateOrJoinRoomDiv>
  );
};

export default JoinRoom;
