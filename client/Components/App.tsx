import React from 'react';
const { useState, useEffect } = React;
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

import { setDark, setLight, setUser } from '../store';
import MainNav from './MainNav';
import GlobalStyle, { defaultTheme } from '../styles';
import { useTypedDispatch, useTypedSelector } from '../hooks';

const App = () => {
  // redux
  const { styleOpt } = useTypedSelector((state) => ({
    styleOpt: state.styleOpt.value,
  }));
  const dispatch = useTypedDispatch();

  // local state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // console.log(params);
      const storedStyle = window.localStorage.getItem('styleOpt');
      if (
        (storedStyle === 'dark' || storedStyle === 'light') &&
        storedStyle !== styleOpt
      ) {
        if (storedStyle === 'dark') {
          dispatch(setDark());
        }
        if (storedStyle === 'light') dispatch(setLight());
      } else {
        window.localStorage.setItem('styleOpt', styleOpt);
      }
      setLoading(false);
    }
  }, [loading]);

  return (
    <ThemeProvider theme={{ ...defaultTheme, styleOpt: styleOpt }}>
      <GlobalStyle />
      <Router>
        <MainNav />
        <Switch>
          <Route path="login" component={() => <div>Login</div>} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
