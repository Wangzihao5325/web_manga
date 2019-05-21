import React, { Component } from 'react';
import { HeaderPro } from '../../../component/header/index';

export default class SetInviteCode extends Component {
    render() {
        return (
            <div style={{ flex: 1 }}>
                <HeaderPro back={this.goBack} title='邀请码' rightBtnText='保存' />

            </div>
        );
    }
}