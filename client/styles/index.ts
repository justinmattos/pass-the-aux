import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { MainNavDiv } from './MainNavStyles';

const GlobalStyle = createGlobalStyle<{ readonly theme: 'light' | 'dark' }>`
  :root {
    --void: #0e0b16;
    --fuschia: #a239ca;
    --jewel: #4717f6;
    --stark: #e7dfdd;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => {
      if (theme === 'light') return 'var(--stark)';
      if (theme === 'dark') return 'var(--void)';
    }};
    color: ${({ theme }) => {
      if (theme === 'light') return 'var(--void)';
      if (theme === 'dark') return 'var(--stark)';
    }};
  }
`;

export const Button = styled(motion.button)<{ readonly secondary?: boolean }>`
  padding: 0.5rem;
  background: ${({ secondary }) =>
    secondary ? 'var(--fuschia)' : 'var(--jewel)'};
  border: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

export { MainNavDiv };

export default GlobalStyle;
