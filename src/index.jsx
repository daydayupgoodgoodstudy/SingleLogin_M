
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configSotre from "./redux/configStore";


import App from "./content/App.jsx"
const store = configSotre();



  ReactDOM.render(
    <Provider store={store}>
          <App />
    </Provider>,
    document.getElementById('wrapper')
  );
