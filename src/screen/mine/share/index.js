import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';


class Share extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <HeaderPro title='推广分享' back={this.goBack} />
                <div style={{ height: CLIENT_HEIGHT - 40, width: CLIENT_WIDTH, backgroundColor: 'rgb(216,107,67)' }}>
                </div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

const ShareWithRouter = withRouter(Share);
export default ShareWithRouter;