import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';


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
                <Menu style={{ width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row' }} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item style={{ width: CLIENT_WIDTH / 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key="task">
                        任务明细
                    </Menu.Item>
                    <Menu.Item style={{ width: CLIENT_WIDTH / 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key="in" >
                        充值明细
                    </Menu.Item>
                    <Menu.Item style={{ width: CLIENT_WIDTH / 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key="out" >
                        消费明细
                    </Menu.Item>
                </Menu>
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