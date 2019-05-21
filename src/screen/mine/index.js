import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store/index';
import { tab_navi_show } from '../../store/actions/tabBottomNaviAction';
import { pop_show } from '../../store/actions/popAction';
import './index.css';

class Header extends Component {
    render() {
        return (
            <div style={{ height: 55, width: '100%', marginLeft: 16, display: 'flex', flexDirection: 'row' }}>
                <img style={{ height: 55, width: 55 }} src={require('../../image/mine_tab_default.png')} alt='' />
                <div style={{ flex: 1, paddingLeft: 16 }}>
                    <div style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{this.props.userName}</div>
                    <div style={{ color: 'white', fontSize: 13, marginTop: 5 }}>{this.props.slogan}</div>
                </div>
                <div style={{ width: 44, height: 55, paddingLeft: 18, paddingTop: 19 }}>
                    <img style={{ height: 16, width: 8, alignSelf: 'center' }} src={require('../../image/mine/mine_right_arrow.png')} alt='' />
                </div>
            </div>
        );
    }
}

class Tabs extends Component {
    render() {
        return (
            <div style={{ height: 95, paddingTop: 53, width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div onClick={this.props.share} style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/mine/invite.png')} alt='' />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>分享推广</div>
                </div>

                <div onClick={this.props.pay} style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/mine/pay.png')} alt='' />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>充值中心</div>
                </div>

                <div onClick={this.props.feedback} style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/mine/feedback.png')} alt='' />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>意见反馈</div>
                </div>

                <div onClick={this.props.custom} style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/mine/custom.png')} alt='' />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>官方客服</div>
                </div>
            </div>
        );
    }
}

class WhiteBorder extends Component {
    render() {
        return (
            <div className='white-bord' style={{ height: 93, width: document.body.clientWidth - 24, position: 'absolute', top: 127, left: 12, right: 12, backgroundColor: 'white', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                <div className='total-center'>
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 23, fontWeight: 'bold' }}>{`${this.props.inviteNum}人`}</div>
                    <div style={{ color: 'rgb(193,193,193)', fontSize: 13 }}>已邀请</div>
                </div>
                <div style={{ height: 39, width: 1, backgroundColor: 'rgb(193,193,193)', alignSelf: 'center' }} />
                <div className='total-center'>
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 23, fontWeight: 'bold' }}>{`${this.props.coins}C`}</div>
                    <div style={{ color: 'rgb(193,193,193)', fontSize: 13 }} >我的C币</div>
                </div>
            </div>
        );
    }
}

class Banner extends Component {
    render() {
        return (
            <div style={{ height: 101, width: document.body.clientWidth, backgroundColor: 'rgb(251,248,247)' }}></div>
        );
    }
}

class ListItem extends Component {
    render() {
        return (
            <div onClick={this.props.onPress} style={{ height: 53, width: document.body.clientWidth, display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: 53, width: document.body.clientWidth - 14, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomStyle: 'solid', borderBottomColor: 'rgb(244,244,244)', borderBottomWidth: 1 }}>
                    <img style={{ height: 17, width: 17, marginLeft: 22 }} src={this.props.imgPath} alt='' />
                    <div style={{ marginLeft: 18, color: 'rgb(34,34,34)', fontSize: 14 }}>{this.props.title}</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ height: 53, width: 53, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <img style={{ height: 15, width: 8 }} src={require('../../image/mine/mine_right_arrow_2.png')} alt='' />
                    </div>
                </div>
            </div>
        );
    }
}

class Mine extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_show());
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <WhiteBorder inviteNum={this.props.inviteNum} coins={this.props.coins} />
                <div className='mine-header-container' style={{ height: 135, width: '100%', paddingTop: 53 }} >
                    <Header userName={this.props.userName} slogan={this.props.slogan} />
                </div>
                <Tabs
                    share={this.goToShare}
                    pay={this.goToPay}
                    feedback={this.goToFeedback}
                    custom={this.goToCustom}
                />
                <Banner />
                <ListItem onPress={this.goToRegister} title='注册账号' imgPath={require('../../image/mine/my_write.png')} />
                <ListItem onPress={this.goToInviteCode} title='邀请码' imgPath={require('../../image/mine/set_invite_code.png')} />
            </div>
        );
    }

    goToShare = () => {

    }

    goToPay = () => {

    }

    goToFeedback = () => {

    }

    goToCustom = () => {

    }

    goToRegister = () => {
        this.props.history.push('/register/');
    }

    goToSetInviteCode = () => {
        // store.dispatch(pop_show('InviteCode'));
    }

}

function mapState2Props(store) {
    return {
        userName: store.user.userName,
        slogan: store.user.slogan,
        inviteNum: store.user.invite,
        coins: store.user.coins
    }
}

const MineWithRouter = withRouter(connect(mapState2Props)(Mine));
export default MineWithRouter;