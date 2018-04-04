import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/animate.css';
import './assets/toastr.css';

import registerServiceWorker from './registerServiceWorker';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
