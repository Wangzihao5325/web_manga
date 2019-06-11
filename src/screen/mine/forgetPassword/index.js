import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';

import { HeaderPro } from '../../../component/header/index';
import { LoginPhoneNumInput, LoginPasswordInput, LoginVerCodeInput } from '../../../component/input/index';
import { LoginBtn } from '../../../component/btn/index';
import bg_image from '../../../image/mine/login_bg.png'
import './index.css';
import Api from '../../../socket/index';
import { ToastsStore } from 'react-toasts';


const reg = { mobile: '', password: '', verCode: '', verKey: '123' };

class ForgetPassword extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
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
                    <div style={{ marginLeft: positionLeft, marginTop: CLIENT_HEIGHT - 40 - borderHeight, height: borderHeight, width: borderWidth, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ height: 49, width: 49 }} src={require('../../../image/icon.png')} alt='' />
                            <div>
                                <div style={{ marginLeft: 10, fontSize: 24, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>工口君</div>
                                <div style={{ marginLeft: 10, fontSize: 12, color: 'rgb(169,169,169)' }}>满足你所有幻想</div>
                            </div>
                        </div>
                        <LoginPhoneNumInput callback={this.mobileTextChange} marginTop={43} />
                        <LoginPasswordInput callback={this.passwordTextChange} marginTop={15} />
                        <LoginVerCodeInput send={this.sendMessage} callback={this.verCodeTextChange} marginTop={15} />

                        <LoginBtn onPress={this.changePassword} title='修改密码' marginTop={29} />
                    </div>
                </div>
            </div>
        );
    }

    changePassword = () => {
        if (reg.mobile.length === 11 && reg.verCode.length > 0 && reg.password.length >= 8 && reg.password.length <= 16) {
            Api.resetPwd(reg.mobile, reg.password, reg.verKey, reg.verCode, (e, code, message) => {
                ToastsStore.success('找回账号成功，快去登陆吧！');
                this.props.history.goBack();
            });
        } else {
            ToastsStore.error('请输入正确的信息! (密码长度需为8-16位)');
        }
        Api.resetPwd();
    }

    sendMessage = () => {
        if (reg.mobile.length === 11) {
            Api.sendMessage(reg.mobile, (e) => {
                reg.verKey = e.verification_key;
                // send message success
            });
        } else {
            ToastsStore.error('请输入手机号码!');
        }
    }

    mobileTextChange = (e) => {
        reg.mobile = e;
    }

    passwordTextChange = (e) => {
        reg.password = e;
    }

    verCodeTextChange = (e) => {
        reg.verCode = e;
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const RegisterWithRouter = withRouter(ForgetPassword);
export default RegisterWithRouter;