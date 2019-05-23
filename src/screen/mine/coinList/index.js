import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';


class CoinList extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='C币明细' back={this.goBack} />
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

const InviteListWithRouter = withRouter(CoinList);
export default InviteListWithRouter;