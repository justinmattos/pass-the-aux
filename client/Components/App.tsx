import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const { useState, useEffect } = React;

import store from '../store';
import MainNav from './MainNav';
import GlobalStyle from '../styles';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (loading) {
      const localTheme = window.localStorage.getItem('theme');
      if (localTheme) {
        setTheme(localTheme);
      } else {
        window.localStorage.setItem('theme', theme);
      }
    }
  }, [loading]);

  return (
    <Provider store={store}>
      <GlobalStyle theme={theme} />
      <MainNav />
      <Router>
        <Switch>
          <Route path="login" component={() => <div>Login</div>} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
