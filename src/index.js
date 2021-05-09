import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import { Provider } from "react-redux";
import Login from "./components/Login";

ReactDOM.render(
  // <Provider>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>,
  // </Provider>,
  document.getElementById("root")
);