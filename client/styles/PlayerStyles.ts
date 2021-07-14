import styled from 'styled-components';
import { motion } from 'framer-motion';

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
