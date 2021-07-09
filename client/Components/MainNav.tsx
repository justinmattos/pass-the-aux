import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks';
import { MainNavDiv, TopNavDiv, SideNavDiv } from '../styles';

const MainNav = () => {
  const { styleOpt } = useTypedSelector((state) => ({
    styleOpt: state.styleOpt.value,
  }));
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {}, [loading]);

  return (
    <MainNavDiv>
      {expanded ? (
        <SideNavDiv></SideNavDiv>
      ) : (
        <TopNavDiv>
          <img src={`/public/menu-${styleOpt}.svg`} width="15rem" />
          <div>Pass the Aux</div>
          <div>Login</div>
        </TopNavDiv>
      )}
    </MainNavDiv>
  );
};

export default MainNav;
