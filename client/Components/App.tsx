import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const { useState, useEffect } = React;

import { setDark, setLight } from '../store';
import MainNav from './MainNav';
import GlobalStyle, { defaultTheme } from '../styles';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import { ThemeProvider } from 'styled-components';

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
      <MainNav />
      <Router>
        <Switch>
          <Route path="login" component={() => <div>Login</div>} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
