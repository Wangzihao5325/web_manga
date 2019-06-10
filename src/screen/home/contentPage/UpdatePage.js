import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Api from '../../../socket/index';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../../component/tabSelect/WeekSelect';
import { Comic3Item } from '../../../component/frontCover/index';
import './index.css';
import { ToastsStore } from 'react-toasts';



class UpdatePage extends Component {

    state = {
        selected: 0,
        weekData: [],
        data: [],
        nowPage: -1,
        totalPage: -1,
    };

    componentDidMount() {
        const timestamp = (new Date().getTime() / 1000).toFixed(0);
        Api.specialList('recommend', timestamp, 1, 10, (e) => {
            let data = e.lists.data;
            let nowPage = e.lists.current_page;
            this.setState({
                data,
                nowPage,
                totalPage: e.lists.last_page
            });
        });

        let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        let today = new Date().getDay();
        let reg = week.slice(0, today + 1);
        week.splice(7, 0, ...reg);
        week.splice(0, today + 1);
        week[6] = 'new';
        week[5] = '昨日';
        this.setState({
            weekData: week,
            selected: week[6]
        });
    }

    render() {
        const { selected, weekData } = this.state;
        // Create menu from items
        const menu = Menu(weekData, selected);
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 24, width: CLIENT_WIDTH, alignSelf: 'center', marginTop: 10 }}>
                    <ScrollMenu
                        data={menu}
                        selected={selected}
                        onSelect={this._onSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div className='scrolllist' style={{ flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        loadMore={this._loadMore}
                    >
                        {
                            this.state.data.map((item, index) => {
                                return <Comic3Item coverClick={() => this.itemClick(item)} isHiddenIndexTab={true} index={index} key={item.title} item={item} />;
                            })
                        }
                        <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

    itemClick = (item) => {
        if (this.props.isLogin) {
            this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`);
        } else {
            ToastsStore.warning('请先登录');
        }
    }

    _onSelect = (key) => {
        const keyIndex = this.state.weekData.indexOf(key);
        const timestamp = (new Date().getTime() / 1000).toFixed(0) - (24 * 3600 * (6 - keyIndex));
        Api.specialList('recommend', timestamp, 1, 10, (e) => {
            let data = e.lists.data;
            let nowPage = e.lists.current_page;
            this.setState({
                data,
                nowPage,
                totalPage: e.lists.last_page
            });
        });

    }

    _loadMore = () => {

        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        const keyIndex = this.state.weekData.indexOf(this.state.selected);
        const timestamp = (new Date().getTime() / 1000).toFixed(0) - (24 * 3600 * (6 - keyIndex));
        let newPage = this.state.nowPage + 1;
        Api.specialList('recommend', timestamp, newPage, 10, (e) => {
            let dataArr = [...this.state.data];
            this.setState({
                data: dataArr.concat(e.lists.data),
                nowPage: e.lists.current_page,
                totalPage: e.lists.last_page,
            });
        });

    }
}

function mapState2Props(store) {
    return {
        isLogin: store.user.isLogin,
    }
}

const UpdatePageWithRedux = connect(mapState2Props)(UpdatePage);

export default UpdatePageWithRedux;