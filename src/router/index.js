import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Index from '../screen/home/index';
import Collect from '../screen/collect/index';
import Task from '../screen/task/index';
import Mine from '../screen/mine/index';
import Register from '../screen/mine/register/index';

import Footer from '../component/footerBar/index';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Index} />
                        <Route path="/collect/" component={Collect} />
                        <Route path="/task/" component={Task} />
                        <Route path="/mine/" component={Mine} />
                        <Route path="/register/" component={Register} />
                    </Switch>
                    {this.props.isShow && <Footer />}
                </div>
            </Router >
        );
    }
}

function mapState2Props(store) {
    return {
        isShow: store.tabNavi.isShow,
    }
}

export default connect(mapState2Props)(AppRouter);
