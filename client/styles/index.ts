import styled, { createGlobalStyle, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';
import {
  MainNavDiv,
  TopNavDiv,
  TopMenuOption,
  SideNavDiv,
  SideNavComplement,
  SideMenuOption,
} from './MainNavStyles';
import { ControllerDiv } from './PlayerStyles';
export {
  ControllerDiv,
  MainNavDiv,
  TopNavDiv,
  TopMenuOption,
  SideNavDiv,
  SideNavComplement,
  SideMenuOption,
};

interface MainTheme {
  back: string;
  text: string;
  navBack: string;
  navText: string;
  navSelect: string;
}

declare module 'styled-components' {
  interface DefaultTheme {
    styleOpt: 'dark' | 'light';
    dark: MainTheme;
    light: MainTheme;
    button: {
      primary: string;
      secondary: string;
      text: string;
    };
  }
}

export const defaultTheme: DefaultTheme = {
  styleOpt: 'light',
  dark: {
    back: '#0e0b16',
    text: '#e7dfdd',
    navBack: '#4717f6',
    navText: '#e7dfdd',
    navSelect: '#a239ca',
  },
  light: {
    back: '#e7dfdd',
    text: '#0e0b16',
    navBack: '#a239ca',
    navText: '#F7FFDB',
    navSelect: '#4717f6',
  },
  button: {
    primary: '#4717f6',
    secondary: '#a239ca',
    text: '#0e0b16',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme[theme.styleOpt].back};
    color: ${({ theme }) => theme[theme.styleOpt].text};
  }
`;

export const Button = styled(motion.button)<{
  readonly primaryButton?: boolean;
}>`
  padding: 0.5rem;
  background: ${({
    primaryButton,
    theme: {
      button: { primary, secondary },
    },
  }) => (primaryButton ? primary : secondary)};
  color: ${({
    theme: {
      button: { text },
    },
  }) => text}
  border: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

export const ToggleContainer = styled.div<{ isOn: boolean }>`
  width: 3.2rem;
  height: 2rem;
  background: ${({ theme }) => theme[theme.styleOpt].text};
  display: flex;
  border-radius: 1rem;
  justify-content: ${({ isOn }) => {
    return isOn ? 'flex-end' : 'flex-start';
  }};
  cursor: pointer;
`;

export const ToggleHandle = styled(motion.div)`
  width: 1.6rem;
  height: 1.6rem;
  background: ${({ theme }) => theme[theme.styleOpt].back};
  border-radius: 0.8rem;
  margin: 0.2rem;
`;

export default GlobalStyle;
