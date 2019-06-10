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
                        <LoginPhoneNumInput marginTop={43} />
                        <LoginPasswordInput marginTop={15} />
                        <LoginVerCodeInput marginTop={15} />

                        <LoginBtn onPress={this.login} title='修改密码' marginTop={29} />
                    </div>
                </div>
            </div>
        );
    }

    register = () => {

    }

    forgetPassword = () => {

    }

    login = () => {

    }

    goBack = () => {
        this.props.history.push('/login/');
    }
}

const RegisterWithRouter = withRouter(ForgetPassword);
export default RegisterWithRouter;