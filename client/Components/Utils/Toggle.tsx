import React, { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { ToggleContainer, ToggleHandle } from '../../styles';
import { setDark, setLight } from '../../store';

const Toggle = () => {
  // redux store
  const { styleOpt } = useTypedSelector((state) => ({
    styleOpt: state.styleOpt.value,
  }));
  const dispatch = useTypedDispatch();

  const toggleSwitch = (): void => {
    let newStyleOpt;
    if (styleOpt === 'dark') {
      newStyleOpt = 'light';
      dispatch(setLight());
    }
    if (styleOpt === 'light') {
      newStyleOpt = 'dark';
      dispatch(setDark());
    }
    window.localStorage.setItem('styleOpt', newStyleOpt);
  };

  return (
    <ToggleContainer isOn={styleOpt === 'dark'} onClick={toggleSwitch}>
      <ToggleHandle
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
    </ToggleContainer>
  );
};

export default Toggle;
