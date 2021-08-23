import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RoomsDiv = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const NoRoomDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  * {
    margin-top: 1rem;
    text-align: center;
  }
`;

export const LightboxContainer = styled(motion.div)`
  position: fixed;
  top: -1rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(50, 50, 50, 0.8);
`;

export const LightboxContent = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  margin: 1rem;
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  background: ${({ theme }) => theme[theme.styleOpt].back};
`;
