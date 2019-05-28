import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import Api from '../../../socket/index';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import InfiniteScroll from 'react-infinite-scroller';


import TabSelect from '../../../component/tabSelect/index';

const TAB_DATA = [{ title: '任务明细', key: 'task' }, { title: '充值明细', key: 'pay' }, { title: '消费明细', key: 'consume' }];

class Item extends PureComponent {
    render() {
        return (
            <div style={{ height: 78, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: 78, width: CLIENT_WIDTH - 40, display: 'flex', flexDirection: 'row', borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontSize: 16, color: 'rgb(34,34,34)' }}>{this.props.item.title}</div>
                        <div style={{ fontSize: 12, color: 'rgb(195,195,195)', marginTop: 5 }}>{this.props.item.updated_at}</div>
                    </div>
                    <div style={{ height: 77, width: 100, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <div style={{ height: 18, width: 18, borderRadius: 9, backgroundColor: 'rgb(255,42,49)', fontSize: 20, color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>C</div>
                        <div style={{ fontSize: 20, color: 'rgb(255,42,94)', fontWeight: 'bold', marginRight: 6 }}>{`+${this.props.item.value}`}</div>
                    </div>
                </div>
            </div>
        );
    }
}

class CoinList extends PureComponent {

    state = {
        current: 'task',
        tabData: [],
    };

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.coinHistory('task', (e) => {
            this.setState({
                tabData: e.data
            });
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <HeaderPro title='C币明细' back={this.goBack} />
                <TabSelect data={TAB_DATA} callback={this.tabChange} />
                <div style={{ flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }} ref={(ref) => this.scrollParentRef = ref}>
                    <div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadFunc}
                            hasMore={true}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}
                        >
                            {this.state.tabData.map((item, index) => {
                                return <Item item={item} key={index} />;
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }

    tabChange = (key, index, title) => {
        Api.coinHistory(key, (e) => {
            this.setState({
                tabData: e.data
            });
        });
    }

    handleClick = e => {
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