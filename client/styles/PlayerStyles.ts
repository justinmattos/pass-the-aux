import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PlayerDiv = styled.div`
  padding: 0 1rem;
`;

export const PlayerHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlayerHeaderImg = styled.img`
  padding: 1.5rem 0;
`;

export const PlayerAlbumImg = styled.img`
  width: calc(100%);
  padding-bottom: 0.5rem;
`;

export const ControllerDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100vw - 2rem);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme[theme.styleOpt].navBack};
  color: ${({ theme }) => theme[theme.styleOpt].navText};
`;
