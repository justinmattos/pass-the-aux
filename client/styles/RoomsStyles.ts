import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RoomsDiv = styled(motion.div)`
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const NoRoomDiv = styled(motion.div)`
  display: flex;
  flex-flow: column;
  align-items: center;
  * {
    margin-top: 1rem;
    text-align: center;
  }
`;

export const CreateOrJoinRoomDiv = styled(motion.div)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  padding: 1rem;
  margin: 0;
  h3 {
    margin: 0;
    padding: 0 2rem;
  }
  label {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    width: 100%;
    * {
      padding: 0;
      margin: 0;
      width: 100%;
    }
    :first-child {
      padding-bottom: 0.5rem;
    }
  }
`;

export const LightboxShadow = styled(motion.div)`
  position: fixed;
  top: -1rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(50, 50, 50, 0.8);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const LightboxContent = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  margin: 1rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 6.5rem);
  background: ${({ theme }) => theme[theme.styleOpt].back};
`;
