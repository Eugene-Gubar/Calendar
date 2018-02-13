import React from "react";
import ReactDOM from "react-dom";

import "w3-css/w3.css";
import "./index.css";

import App from "./App";
import Auth from "./components/Auth/index";

import history from "./history";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import Errorpage from "./routes/Errorpage";

import { Provider } from "react-redux";
import store from "./redux/stores";

import ErrorBoundary from "./components/ErrorBoundary";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="main">
        <div className="w3-container">
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/login" component={Auth} />
              <Route exact path="/register" component={Auth} />
              <Route path="*" component={Errorpage} />
            </Switch>
          </ErrorBoundary>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
