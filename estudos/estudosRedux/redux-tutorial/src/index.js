// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Local imports
import App from './App';
import rootReducer from './reducers';

// Assets
import './index.css';

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
