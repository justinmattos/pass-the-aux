import styled from 'styled-components';

export const MainNavDiv = styled.div`
  background: ${({ theme }) => theme[theme.styleOpt].navBack};
  color: ${({ theme }) => theme[theme.styleOpt].navText};
  padding: 1rem;
`;

export const TopNavDiv = styled.div`
  display: grid;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
`;

export const SideNavDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const AuthOption = styled.div`
  text-align: right;
`;
