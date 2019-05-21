import React, { Component } from 'react';
import { connect } from 'react-redux';

import InviteCodeModel from '../inviteCode/index';

class ModelContainer extends Component {
    render() {
        switch (this.props.type) {
            case 'InviteCode':
                return <InviteCodeModel />;
            default:
                return <div style={{ height: 1, width: 1 }} />
        }
    }
}

function mapState2Props(store) {
    return {
        type: store.pop.popType,
    }
}

export default connect(mapState2Props)(ModelContainer);