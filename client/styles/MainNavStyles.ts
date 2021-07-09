import styled from 'styled-components';

export const MainNavDiv = styled.div`
  background: ${({ theme }) => theme[theme.styleOpt].navBack};
  color: ${({ theme }) => theme[theme.styleOpt].navText};
  padding: 1rem;
`;

export const TopNavDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SideNavDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
