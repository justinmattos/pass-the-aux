import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MainNavDiv = styled.div`
  > div {
    background: ${({ theme }) => theme[theme.styleOpt].navBack};
    color: ${({ theme }) => theme[theme.styleOpt].navText};
  }
  width: 100vw;
`;

export const TopNavDiv = styled.div`
  display: grid;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
  padding: 1rem;
`;

export const TopMenuOption = styled(motion.div)<{
  left?: boolean;
  width?: string;
}>`
  text-align: ${(props) => (props.left ? 'left' : 'right')};
  width: ${(props) => (props.width ? props.width : '100%')}
  :hover {
    cursor: pointer;
  }
`;

export const SideNavDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: calc(100vw - 3rem);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

export const SideNavComplement = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 3rem;
  opacity: 0;
`;

export const SideMenuOption = styled(motion.div)<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ selected, theme }) =>
    selected ? theme[theme.styleOpt].navSelect : 'inherit'};
  padding: 1rem;
`;
