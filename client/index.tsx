import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './Components/App';

const app = document.querySelector('#app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);
