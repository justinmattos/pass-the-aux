import React, { ChangeEvent, useState } from 'react';
import { useTypedSelector } from '../../hooks';
import { Button, CreateOrJoinRoomDiv } from '../../styles';

interface SelectState {
  value: 'none' | 'universal' | 'democratic';
}

const CreateRoom = () => {
  interface SelectElement extends HTMLSelectElement {
    value: SelectState['value'];
  }

  const [select, setSelect] = useState<SelectState>({ value: 'none' });

  return (
    <CreateOrJoinRoomDiv>
      <h3 style={{ alignSelf: 'center' }}>Create a Room</h3>
      <label>
        Choose a room type:
        <select
          value={select.value}
          onChange={(event: ChangeEvent<SelectElement>) =>
            setSelect({ value: event.target.value })
          }
        >
          <option value="none">--SELECT ONE--</option>
          <option value="universal">Universal Control</option>
          <option value="democratic">Democratic Control</option>
        </select>
      </label>
      <Explanation value={select.value} />
      <label>
        Enter a password:
        <input type="password" />
      </label>
      <Button onClick={() => {}} style={{ alignSelf: 'center' }}>
        Submit
      </Button>
    </CreateOrJoinRoomDiv>
  );
};

const Explanation = ({ value }: SelectState) => {
  if (value === 'none') return <></>;
  if (value === 'democratic')
    return (
      <div>
        In Democratic Control, you and others in your room suggest songs to add
        to the queue. Each member of the room can vote on songs added by others,
        and when a song gets support from a majority of the room, it enters the
        queue. While you can vote with others, you also retain full control of
        your playback.
      </div>
    );
  if (value === 'universal')
    return (
      <div>
        In Universal Control, anyone in the room can pause or resume playback,
        skip to the next or previous song in your queue, and add songs to the
        end of the queue. With this room type, you should only share control
        with those you trust.
      </div>
    );
};

export default CreateRoom;
