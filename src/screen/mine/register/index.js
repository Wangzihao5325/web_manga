import React, { Component } from 'react';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import Header from '../../../component/header/index';
import { withRouter } from 'react-router';

import { PhoneNumInput, VerCodeInput } from '../../../component/input/index';
import { NormalBtn } from '../../../component/btn/index';

class Register extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <Header back={this.goBack} />
                <h2 style={{ marginTop: 86, fontSize: 26, color: 'rgb(34,34,34)', marginLeft: 36 }}>手机号码注册</h2>
                <PhoneNumInput />
                <VerCodeInput />
                <NormalBtn title='立即绑定' onPress={this.register} marginTop={41} />
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }

    register = () => {

    }
}

const RegisterWithRouter = withRouter(Register);
export default RegisterWithRouter;