import axios from 'axios';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import { setUser } from '../store';
import { setToken } from '../store/slices/auth';
import { MainNavDiv, TopNavDiv, SideNavDiv, MenuOption } from '../styles';

const MainNav = () => {
  // redux store
  const { styleOpt, user } = useTypedSelector((state) => ({
    styleOpt: state.styleOpt.value,
    user: state.auth.user,
  }));
  const dispatch = useTypedDispatch();

  // react-router
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const history = useHistory();

  // local state
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [slideoutX, setSlideoutX] = useState(3000);
  const slideout = useRef(null);

  const getUserWithToken = (token: string): Promise<string> => {
    return new Promise((res, rej) => {
      axios
        .post('/login/refresh', { refresh_token: token })
        .then(({ data }) => {
          const { display_name, email, id, images } = data.user;
          dispatch(setUser({ user: { display_name, email, id, images } }));
          setLoading(false);
          res(display_name);
        })
        .catch((err) => {
          console.error(err);
          rej(err);
        });
    });
  };

  useEffect(() => {
    if (loading) {
      const storedToken = window.localStorage.getItem('token');
      if (storedToken) {
        getUserWithToken(storedToken).catch((err) => {
          window.localStorage.removeItem('token');
        });
      }
      const retrievedToken = search.get('token');
      if (retrievedToken) {
        getUserWithToken(retrievedToken).then(() => {
          window.localStorage.setItem('token', retrievedToken);
          history.push('/');
        });
      }
    }
  }, [loading]);

  const logIn = (): void => {
    // something to indicate to the user that they will login with spotify, and that if they've previously authorized the app, then it will be instant.
    window.location.href = '/login';
  };

  const logOut = (): void => {
    window.localStorage.removeItem('token');
    dispatch(
      setUser({ user: { display_name: '', email: '', id: '', images: [] } })
    );
  };

  useLayoutEffect(() => {
    if (!slideout.current) return;
    if (slideoutX !== slideout.current.offsetWidth)
      setSlideoutX(slideout.current.offsetWidth);
  });

  return (
    <MainNavDiv>
      <TopNavDiv>
        <MenuOption left>
          <img
            src={`/public/menu-${styleOpt}.svg`}
            width="15rem"
            onClick={() => setExpanded(true)}
          />
        </MenuOption>
        <div style={{ textAlign: 'center' }}>Pass the Aux</div>
        {expanded ? (
          <MenuOption>
            <img
              src={`/public/exit-${styleOpt}.svg`}
              width="15rem"
              onClick={() => setExpanded(false)}
            />
          </MenuOption>
        ) : user.id ? (
          <MenuOption onClick={logOut}>Logout</MenuOption>
        ) : (
          <MenuOption onClick={logIn}>Login</MenuOption>
        )}
      </TopNavDiv>
      <SideNavDiv
        ref={slideout}
        initial="hidden"
        animate={expanded ? 'visible' : 'hidden'}
        variants={{
          visible: { x: 0 },
          hidden: { x: -slideoutX },
        }}
        transition={{
          ease: 'easeIn',
          duration: 1,
        }}
      ></SideNavDiv>
    </MainNavDiv>
  );
};

export default MainNav;
