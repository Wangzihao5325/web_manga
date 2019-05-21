import React, { Component } from 'react';
import { withRouter } from 'react-router';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';

import { HeaderPro } from '../../../component/header/index';

class SetInviteCode extends Component {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <HeaderPro back={this.goBack} title='邀请码' rightBtnText='保存' />
                <input style={{ height: 50, width: document.documentElement.clientWidth }} placeholder='请填写邀请码' />
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }

}

const SetInviteCodeWithRouter = withRouter(SetInviteCode);
export default SetInviteCodeWithRouter;