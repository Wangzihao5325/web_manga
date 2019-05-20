import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index from '../screen/home/index';
import Collect from '../screen/collect/index';
import Task from '../screen/task/index';
import Mine from '../screen/mine/index';

import Footer from '../component/footerBar/index';

function AppRouter() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/collect/" component={Collect} />
                    <Route path="/task/" component={Task} />
                    <Route path="/mine/" component={Mine} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default AppRouter;