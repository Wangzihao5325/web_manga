import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Api from '../../../socket/index';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../../component/tabSelect/WeekSelect';


export default class UpdatePage extends Component {

    state = {
        selected: 0,
        weekData: [],
        data: [],
        nowPage: -1,
    };

    componentDidMount() {

        Api.specialList('recommend', 1, 10, (e) => {
            console.log(e);
            let data = e.lists.data;
            let nowPage = e.lists.current_page;
            this.setState({
                data,
                nowPage
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
                        onSelect={this.onSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        loadMore={this._loadMore}
                    >
                        {
                            this.state.data.map((item, index) => {
                                
                            })
                        }
                        <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

    _loadMore = () => {

    }
}