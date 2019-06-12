import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import store from '../store/index';
import { pop_unshow } from '../store/actions/popAction';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import InitComponent from './InitComponent';
import asyncImport from './asyncComponent';
import ModelContainer from '../screen/modelContainer/index';
import Footer from '../component/footerBar/index';
import LinkFooter from '../component/footerBar/LostFooter';

const Index = asyncImport(() => import('../screen/home/index'));
const CGDetail = asyncImport(() => import('../screen/detailScreen/cgDetail'));
const MangaDetail = asyncImport(() => import('../screen/detailScreen/mangaDetail'));
const MangaRead = asyncImport(() => import('../screen/detailScreen/mangaDetail/mangaRead'));
const Search = asyncImport(() => import('../screen/search/index'));
const LeaderBoard = asyncImport(() => import('../screen/leaderBoard/index'));
const TypeScreen = asyncImport(() => import('../screen/typesScreen/index'));

const Collect = asyncImport(() => import('../screen/collect/index'));

const Task = asyncImport(() => import('../screen/task/index'));

const Mine = asyncImport(() => import('../screen/mine/index'));
const Register = asyncImport(() => import('../screen/mine/register/index'));
const SetInviteCode = asyncImport(() => import('../screen/mine/setInviteCode/index'));
const Login = asyncImport(() => import('../screen/mine/login/index'));
const Share = asyncImport(() => import('../screen/mine/share/index'));
const Pay = asyncImport(() => import('../screen/mine/pay/index'));
const PayInfo = asyncImport(() => import('../screen/mine/pay/payInfo/index'));
const ForgetPassword = asyncImport(() => import('../screen/mine/forgetPassword/index'));
const InviteList = asyncImport(() => import('../screen/mine/inviteList/index'));
const CoinList = asyncImport(() => import('../screen/mine/coinList/index'));
const Feedback = asyncImport(() => import('../screen/mine/feedback/index'));
const NotFoundPage = asyncImport(() => import('../screen/notFoundPage/index'));

class AppRouter extends Component {

    render() {
        if (this.props.isAppInit) {
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
                        {this.props.isLost && this.props.isShow && <LinkFooter url={this.props.offical_url} />}
                        {this.props.isShow && <Footer />}
                    </div>
                </Router >
            );
        } else {
            return (
                <InitComponent />
            );
        }
    }

    _popUnshow = () => {
        store.dispatch(pop_unshow());
    }
}

function mapState2Props(store) {
    return {
        isShow: store.tabNavi.isShow,
        popShow: store.pop.popShow,
        isAppInit: store.test.isAppInit,
        isLost: store.appInfo.isLost,
        offical_url: store.appInfo.offical_url,
    }
}

export default connect(mapState2Props)(AppRouter);
