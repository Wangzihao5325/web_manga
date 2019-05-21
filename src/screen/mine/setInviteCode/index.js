import React, { Component } from 'react';
import Header from '../../../component/header/index';

class SetInviteCode extends Component {
    render() {
        return (
            <div style={{ flex: 1 }}>
                <Header back={this.goBack} />

            </div>
        );
    }
}