import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index from '../screen/home/index';
import About from '../screen/about/index';
import Users from '../screen/user/index';

function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;