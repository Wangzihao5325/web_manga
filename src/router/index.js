import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import store from '../store/index';
import { pop_unshow } from '../store/actions/popAction';
import { ToastsContainer, ToastsStore } from 'react-toasts';

import Index from '../screen/home/index';
import CGDetail from '../screen/detailScreen/cgDetail';
import MangaDetail from '../screen/detailScreen/mangaDetail';
import MangaRead from '../screen/detailScreen/mangaDetail/mangaRead';
import Search from '../screen/search/index';
import LeaderBoard from '../screen/leaderBoard/index';
import TypeScreen from '../screen/typesScreen/index';

import Collect from '../screen/collect/index';

import Task from '../screen/task/index';

import Mine from '../screen/mine/index';
import Register from '../screen/mine/register/index';
import SetInviteCode from '../screen/mine/setInviteCode/index';
import Login from '../screen/mine/login/index';
import Share from '../screen/mine/share/index';
import Pay from '../screen/mine/pay/index';
import PayInfo from '../screen/mine/pay/payInfo/index';
import ForgetPassword from '../screen/mine/forgetPassword/index';
import InviteList from '../screen/mine/inviteList/index';
import CoinList from '../screen/mine/coinList/index';
import Feedback from '../screen/mine/feedback/index';
import NotFoundPage from '../screen/notFoundPage/index';


import ModelContainer from '../screen/modelContainer/index';

import Footer from '../component/footerBar/index';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ToastsContainer store={ToastsStore} />
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
                        <Route path="/pay_info/" component={PayInfo} />
                        <Route path="/forget_password/" component={ForgetPassword} />
                        <Route path="/invite_list/" component={InviteList} />
                        <Route path="/coin_list/" component={CoinList} />
                        <Route path="/cg_detail/:id/:title/:type" component={CGDetail} />
                        <Route path="/manga_detail/:id/:type" component={MangaDetail} />
                        <Route path="/manga_read/:id/:resource/:index/:type" component={MangaRead} />
                        <Route path="/search/:type/" component={Search} />
                        <Route path="/leaderBoard/" component={LeaderBoard} />
                        <Route path="/type/" component={TypeScreen} />
                        <Route path="/feedback/" component={Feedback} />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                    {this.props.popShow &&
                        <div
                            style={{
                                zIndex: 200,
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={this._popUnshow}
                        >
                            <ModelContainer />
                        </div>
                    }
                    {this.props.isShow && <Footer />}
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
