import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Api from '../../socket/index';

class Home extends Component {

    componentDidMount() {
        Api.comicGlobal((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div >
                home
            </div>
        );
    }
}

const HomeWithRouter = withRouter(Home);
export default HomeWithRouter;