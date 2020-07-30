import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Room from "./Room";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:room">
          <Room />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
