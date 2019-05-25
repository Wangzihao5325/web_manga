import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';

import TabSelect from '../../../component/tabSelect/index';


class CoinList extends PureComponent {

    state = {
        current: 'task',
    };

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <HeaderPro title='C币明细' back={this.goBack} />
                <TabSelect data={[{ title: '任务明细', key: 1 }, { title: '充值明细', key: 2 }, { title: '消费明细', key: 3 }]} />
            </div>
        );
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

const InviteListWithRouter = withRouter(CoinList);
export default InviteListWithRouter;