import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import Api from '../../../socket/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';

import { HeaderPro } from '../../../component/header/index';
import { LoginPhoneNumInput, LoginPasswordInput } from '../../../component/input/index';
import { LoginBtn } from '../../../component/btn/index';
import bg_image from '../../../image/mine/login_bg.png'
import './index.css';

const reg = { mobile: '', password: '' };

class Login extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    componentWillUnmount() {
        reg.mobile = '';
        reg.password = '';
    }

    render() {
        let imageHeight = CLIENT_HEIGHT - 40;
        let imageWidth = CLIENT_WIDTH;
        let borderHeight = 0.7 * imageHeight;
        let borderWidth = 0.8 * imageWidth;
        let positionLeft = 0.1 * imageWidth;
        return (
            <div style={{ flex: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <HeaderPro title='' back={this.goBack} />
                <div className='bg-image-container' style={{ height: CLIENT_HEIGHT - 40, width: imageWidth, backgroundImage: `url(${bg_image})` }}>
                    <div style={{ position: 'absolute', left: positionLeft, bottom: 0, height: borderHeight, width: borderWidth, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ height: 49, width: 49 }} src={require('../../../image/icon.png')} alt='' />
                            <div>
                                <div style={{ marginLeft: 10, fontSize: 24, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>工口君</div>
                                <div style={{ marginLeft: 10, fontSize: 12, color: 'rgb(169,169,169)' }}>满足你所有幻想</div>
                            </div>
                        </div>
                        <LoginPhoneNumInput callback={this.mobileTextChange} marginTop={43} />
                        <LoginPasswordInput callback={this.passwordTextChange} marginTop={19} />
                        <div style={{ marginTop: 15, height: 20, width: borderWidth - 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div onClick={this.register} style={{ color: 'rgb(34,34,34)', fontSize: 13 }}>立即注册</div>
                            <div onClick={this.forgetPassword} style={{ color: 'rgb(34,34,34)', fontSize: 13 }}>忘记密码？</div>
                        </div>
                        <LoginBtn onPress={this.login} title='登陆' marginTop={29} />
                    </div>
                </div>
            </div>
        );
    }

    mobileTextChange = (e) => {
        reg.mobile = e;
    }

    passwordTextChange = (e) => {
        reg.password = e;
    }

    register = () => {
        this.props.history.push('/register/');
    }

    forgetPassword = () => {
        this.props.history.push('/forget_password/');
    }

    login = () => {
        console.log(reg.mobile);
        console.log(reg.password);
        if (reg.mobile.length === 11 && reg.password.length >= 8 && reg.password.length <= 16) {
            Api.login(reg.mobile, reg.password, (e, code, message) => {
                ToastsStore.success('登陆成功');
            });
        } else {
            ToastsStore.error('请输入正确的信息');
        }
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

const LoginWithRouter = withRouter(Login);
export default LoginWithRouter;