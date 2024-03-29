import React from 'react';
const { useState, useEffect } = React;
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { MainNav } from './Navigation';
import { Current, Controller } from './Player';
import { Rooms } from './Rooms';
import { setDark, setLight } from '../store';
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
          <Route path="/current" component={Current} />
          <Route path="/rooms" component={Rooms} />
        </Switch>
        <Controller />
      </Router>
    </ThemeProvider>
  );
};

export default App;
