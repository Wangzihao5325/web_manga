import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Api from '../../socket/index';

class Home extends Component {

    btnPress = () => {
        this.props.history.push('/collect/');
    }

    render() {
        Api.fetchAppNotice((e) => {
            console.log(e);
        });
        return (
            <div onClick={this.btnPress}>
                home
            </div>
        );
    }
}

const HomeWithRouter = withRouter(Home);
export default HomeWithRouter;