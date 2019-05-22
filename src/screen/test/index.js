import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';

class Share extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div>share</div>
        );
    }
}

const ShareWithRouter = withRouter(Share);
export default ShareWithRouter;