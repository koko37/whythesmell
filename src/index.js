import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { initializeFirebase } from './utils/firebase'
import { store, persistor } from './store'

import App from './App';
import Loading from './pages/Loading'
import * as serviceWorker from './serviceWorker';
import './assets/styles/index.scss';


initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
