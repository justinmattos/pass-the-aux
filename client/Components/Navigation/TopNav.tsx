import React from 'react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { collapse, expand, setUser } from '../../store';
import { IconContainer, TopMenuOption, TopNavDiv } from '../../styles';
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

  const iconOpts = {
    color: theme[styleOpt].navText,
    height: '1rem',
    width: '1rem',
  };

  return (
    <TopNavDiv>
      <TopMenuOption left width="15rem">
        <IconContainer>
          {expanded ? (
            <XIcon onClick={() => dispatch(collapse())} {...iconOpts} />
          ) : (
            <MenuAlt1Icon onClick={() => dispatch(expand())} {...iconOpts} />
          )}
        </IconContainer>
      </TopMenuOption>
      <div style={{ textAlign: 'center' }}>Pass the Aux</div>
      <IconContainer>
        {user.id ? (
          <TopMenuOption onClick={logOut}>Logout</TopMenuOption>
        ) : (
          <TopMenuOption onClick={logIn}>Login</TopMenuOption>
        )}
      </IconContainer>
    </TopNavDiv>
  );
};

export default TopNav;
