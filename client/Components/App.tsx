import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const { useState, useEffect } = React;

import { setDark, setLight } from '../store';
import MainNav from './MainNav';
import GlobalStyle from '../styles';
import { useTypedSelector } from '../hooks';

const App = () => {
  const theme = useTypedSelector((state) => state.theme.value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const localTheme = window.localStorage.getItem('theme');
      if (localTheme && localTheme !== theme) {
        if (localTheme === 'dark') setDark();
        if (localTheme === 'light') setLight();
      } else {
        window.localStorage.setItem('theme', theme);
      }
    }
  }, [loading]);

  return (
    <>
      <GlobalStyle theme={theme} />
      <MainNav />
      <Router>
        <Switch>
          <Route path="login" component={() => <div>Login</div>} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
