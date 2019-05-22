import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ToastsStore } from 'react-toasts';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { set_invite_me_code } from '../../../store/actions/userAction';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { CLIENT_WIDTH } from '../../../global/sizes';
import Api from '../../../socket/index';

import { HeaderPro } from '../../../component/header/index';

const reg = { input: '' };

class SetInviteCode extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    componentWillUnmount() {
        reg.input = '';
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                {this.props.invite_me_code.length === 0 && <HeaderPro rightBtnClick={this.submit} back={this.goBack} title='邀请码' rightBtnText='保存' />}
                {this.props.invite_me_code.length > 0 && <HeaderPro back={this.goBack} title='邀请码' />}
                {this.props.invite_me_code.length === 0 && <input onChange={this.textOnChange} style={{ fontSize: 15, marginLeft: 15, alignSelf: 'center', borderRadius: 5, borderColor: 'rgb(245,245,245)', borderStyle: 'solid', borderWidth: 1, marginTop: 18, height: 50, width: CLIENT_WIDTH - 30 }} placeholder='请填写邀请码' />}
                {this.props.invite_me_code.length > 0 &&
                    <div style={{ marginLeft: 15, borderRadius: 5, backgroundColor: 'rgb(245,245,245)', marginTop: 18, height: 50, width: CLIENT_WIDTH - 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ fontSize: 15, marginLeft: 10, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>{this.props.invite_me_code}</div>
                    </div>
                }
            </div>
        );
    }

    submit = () => {
        if (this.props.isLogin) {
            const inputReg = reg.input;
            Api.bindInviteMeCode(inputReg, (e) => {
                ToastsStore.success('绑定邀请码成功!');
                store.dispatch(set_invite_me_code(inputReg));
                this.props.history.push('/mine/');
            });
        } else {
            ToastsStore.warning('请先登录!');
        }
    }

    textOnChange = ({ target }) => {
        reg.input = target.value;
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }

}

function mapState2Props(store) {
    return {
        invite_me_code: store.user.invite_me_code,
        isLogin: store.user.isLogin
    }
}

const SetInviteCodeWithRouter = withRouter(connect(mapState2Props)(SetInviteCode));
export default SetInviteCodeWithRouter;