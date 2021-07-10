import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { setToken, setUser } from '../../store';
import { MainNavDiv } from '../../styles';

const MainNav = () => {
  // redux store
  const dispatch = useTypedDispatch();

  // react-router
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const history = useHistory();

  // local state
  const [loading, setLoading] = useState(true);

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
          dispatch(setToken({ token: retrievedToken }));
          history.push('/');
        });
      }
    }
  }, [loading]);

  return (
    <MainNavDiv>
      <TopNav />
      <SideNav />
    </MainNavDiv>
  );
};

export default MainNav;
