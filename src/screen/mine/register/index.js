import React, { Component } from 'react';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { Header } from '../../../component/header/index';
import { withRouter } from 'react-router';

import Api from '../../../socket/index';
import { PhoneNumInput, VerCodeInput } from '../../../component/input/index';
import { NormalBtn } from '../../../component/btn/index';

const reg = { mobile: '', verCode: '', verKey: '' };
class Register extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <Header back={this.goBack} />
                <h2 style={{ marginTop: 86, fontSize: 26, color: 'rgb(34,34,34)', marginLeft: 36 }}>手机号码注册</h2>
                <PhoneNumInput callback={this.mobileChange} />
                <VerCodeInput send={this.sendMessage} callback={this.verCodeChange} />
                <NormalBtn onPress={this.register} title='立即注册' onPress={this.register} marginTop={41} />
            </div>
        );
    }

    sendMessage = () => {
        Api.sendMessage(
            reg.mobile,
            (e) => {
                if (e.verification_key) {
                    reg.verKey = e.verification_key;
                }
            },
            (error) => {

            }
        );
    }

    mobileChange = (e) => {
        reg.mobile = e;
    }

    verCodeChange = (e) => {
        reg.verCode = e;
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }

    register = () => {
        Api.register(18700121234, 1234, 6856, '123456', '123456', null, (e) => {
            console.log(e);
        });
    }
}

const RegisterWithRouter = withRouter(Register);
export default RegisterWithRouter;