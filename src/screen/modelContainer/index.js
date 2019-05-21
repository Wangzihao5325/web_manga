import React, { Component } from 'react';
import { connect } from 'react-redux';

import InviteCodeModel from '../inviteCode/index';

export default class ModelContainer extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

function mapState2Props(store) {
    return {
        type: store.tabNavi.isShow,
    }
}

export default connect(mapState2Props)(ModelContainer);