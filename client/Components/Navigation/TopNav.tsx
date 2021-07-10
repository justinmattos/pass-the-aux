import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { collapse, expand, setUser } from '../../store';
import { TopMenuOption, TopNavDiv } from '../../styles';

const TopNav = () => {
  // redux store
  const { expanded, styleOpt, user } = useTypedSelector((state) => ({
    expanded: state.menu.expanded,
    styleOpt: state.styleOpt.value,
    user: state.auth.user,
  }));
  const dispatch = useTypedDispatch();

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
      <TopMenuOption left>
        <img
          src={`/public/menu-${styleOpt}.svg`}
          width="15rem"
          onClick={() => dispatch(expand())}
        />
      </TopMenuOption>
      <div style={{ textAlign: 'center' }}>Pass the Aux</div>
      {expanded ? (
        <TopMenuOption>
          <img
            src={`/public/exit-${styleOpt}.svg`}
            width="15rem"
            onClick={() => dispatch(collapse())}
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
