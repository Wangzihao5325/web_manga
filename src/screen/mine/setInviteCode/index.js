import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';

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
                <HeaderPro rightBtnClick={this.submit} back={this.goBack} title='邀请码' rightBtnText='保存' />
                {this.props.invite_code.length === 0 && <input onChange={this.textOnChange} style={{ fontSize: 15, marginLeft: 15, alignSelf: 'center', borderRadius: 5, borderColor: 'rgb(245,245,245)', borderStyle: 'solid', borderWidth: 1, marginTop: 18, height: 50, width: document.documentElement.clientWidth - 30 }} placeholder='请填写邀请码' />}
                {this.props.invite_code.length > 0 &&
                    <div style={{ marginLeft: 15, borderRadius: 5, backgroundColor: 'rgb(245,245,245)', marginTop: 18, height: 50, width: document.documentElement.clientWidth - 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ fontSize: 15, marginLeft: 10, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>{this.props.invite_code}</div>
                    </div>
                }
            </div>
        );
    }

    submit = () => {
        //to submit
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
        invite_code: store.user.invite_code
    }
}

const SetInviteCodeWithRouter = withRouter(connect(mapState2Props)(SetInviteCode));
export default SetInviteCodeWithRouter;