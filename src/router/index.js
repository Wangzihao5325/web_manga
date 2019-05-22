import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import store from '../store/index';
import { pop_unshow } from '../store/actions/popAction';

import Index from '../screen/home/index';

import Collect from '../screen/collect/index';

import Task from '../screen/task/index';

import Mine from '../screen/mine/index';
import Register from '../screen/mine/register/index';
import SetInviteCode from '../screen/mine/setInviteCode/index';
import Login from '../screen/mine/login/index';
import Share from '../screen/mine/share/index';
import Pay from '../screen/mine/pay/index';


import ModelContainer from '../screen/modelContainer/index';

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
                        <Route path="/set_invite_code/" component={SetInviteCode} />
                        <Route path="/login/" component={Login} />
                        <Route path="/share/" component={Share} />
                        <Route path="/pay/" component={Pay} />
                    </Switch>
                    {this.props.isShow && <Footer />}
                    {this.props.popShow &&
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgb(0,0,0,0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={this._popUnshow}
                        >
                            <ModelContainer />
                        </div>
                    }
                </div>
            </Router >
        );
    }

    _popUnshow = () => {
        store.dispatch(pop_unshow());
    }
}

function mapState2Props(store) {
    return {
        isShow: store.tabNavi.isShow,
        popShow: store.pop.popShow
    }
}

export default connect(mapState2Props)(AppRouter);
