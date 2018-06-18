
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configSotre from "./redux/configStore";

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

//国际化 中文
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import "./axios.config";

import App from "./router.jsx";
const store = configSotre();


ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <Router>
        <Switch>
          <Route component={App} />
        </Switch>
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('wrapper')
);
