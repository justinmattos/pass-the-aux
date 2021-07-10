import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MainNavDiv = styled.div`
  > div {
    background: ${({ theme }) => theme[theme.styleOpt].navBack};
    color: ${({ theme }) => theme[theme.styleOpt].navText};
    padding: 1rem;
  }
  width: 100vw;
`;

export const TopNavDiv = styled.div`
  display: grid;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
`;

export const SideNavDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  height: calc(100vh - 2rem);
  width: calc(100vw - 5rem);
  display: flex;
  flex-flow: column nowrap;
`;

export const MenuOption = styled(motion.div)<{ left?: boolean }>`
  text-align: ${(props) => (props.left ? 'left' : 'right')};
`;
