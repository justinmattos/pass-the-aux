import React, { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { ToggleContainer, ToggleHandle } from '../../styles';

interface ToggleProps {
  toggleControl: () => void;
}

const Toggle = ({ toggleControl }: ToggleProps) => {
  // redux store
  const { styleOpt } = useTypedSelector((state) => ({
    styleOpt: state.styleOpt.value,
  }));

  return (
    <ToggleContainer isOn={styleOpt === 'dark'} onClick={toggleControl}>
      <ToggleHandle
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
    </ToggleContainer>
  );
};

export default Toggle;
