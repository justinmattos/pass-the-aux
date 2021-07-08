import * as React from 'react';
import { useTypedSelector } from '../hooks';
import { MainNavDiv } from '../styles';

const MainNav = () => {
  const theme = useTypedSelector((state) => state.theme.value);
  return (
    <MainNavDiv>
      <img src={`/public/menu-${theme}.svg`} width="15em" />
      <h1>Pass the Aux</h1>
      <h2>Music sharing made easy</h2>
    </MainNavDiv>
  );
};

export default MainNav;
