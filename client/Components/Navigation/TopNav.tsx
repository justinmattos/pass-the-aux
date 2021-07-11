import React from 'react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { collapse, expand, setUser } from '../../store';
import { TopMenuOption, TopNavDiv } from '../../styles';
import { useTheme } from 'styled-components';

const TopNav = () => {
  // redux store
  const { expanded, styleOpt, user } = useTypedSelector((state) => ({
    expanded: state.menu.expanded,
    styleOpt: state.styleOpt.value,
    user: state.auth.user,
  }));
  const dispatch = useTypedDispatch();

  const theme = useTheme();

  const logIn = (): void => {
    // something to indicate to the user that they will login with spotify, and that if they've previously authorized the app, then it will be instant.
    window.location.href = '/login';
  };

  const logOut = (): void => {
    window.localStorage.removeItem('token');
    dispatch(
      dispatch(
        setUser({ user: { display_name: '', email: '', id: '', images: [] } })
      )
    );
  };

  return (
    <TopNavDiv>
      <TopMenuOption left width="15rem">
        <MenuAlt1Icon
          color={theme[styleOpt].navText}
          onClick={() => dispatch(expand())}
          width="1rem"
          height="1rem"
        />
      </TopMenuOption>
      <div style={{ textAlign: 'center' }}>Pass the Aux</div>
      {expanded ? (
        <TopMenuOption>
          <XIcon
            color={theme[styleOpt].navText}
            onClick={() => dispatch(collapse())}
            width="1rem"
            height="1rem"
          />
        </TopMenuOption>
      ) : user.id ? (
        <TopMenuOption onClick={logOut}>Logout</TopMenuOption>
      ) : (
        <TopMenuOption onClick={logIn}>Login</TopMenuOption>
      )}
    </TopNavDiv>
  );
};

export default TopNav;
