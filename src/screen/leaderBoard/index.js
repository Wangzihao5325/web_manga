import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../component/tabSelect/ScrollTabSelect';
import InfiniteScroll from 'react-infinite-scroller';
import { Comic3Item } from '../../component/frontCover/index';
import Api from '../../socket/index';


//const DATA = [{ key: '12', name: '韩漫' }, { key: '13', name: 'H漫' }, { key: '14', name: '动漫' }]
const DATA = [{ key: '12', name: '韩漫' }, { key: '13', name: 'H漫' }]

class LeaderBoard extends PureComponent {

    state = {
        selected: '韩漫',
        data: [],
        nowPage: -1,
        totalPage: -1,
    };

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.mangaRank('hanman', 1, 10, (e) => {
            let data = e.data;
            let nowPage = e.current_page;
            this.setState({
                data,
                nowPage,
                totalPage: e.last_page
            });
        });
    }

    render() {
        const { selected } = this.state;
        const menu = Menu(DATA, selected);
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='排行榜' back={this.goBack} />
                <div style={{ flex: 1, width: 160 }} >
                    <ScrollMenu
                        data={menu}
                        selected={selected}
                        onSelect={this.onSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        loadMore={this._loadMore}
                    >
                        {
                            this.state.data.map((item, index) => {
                                let isShow = false;
                                if (index >= 3) {
                                    isShow = true;
                                }
                                return <Comic3Item isHiddenIndexTab={isShow} index={index} key={item.title} item={item} />;
                            })
                        }
                    </InfiniteScroll>
                </div>
            </div>
        );
    }



    _loadMore = () => {

    }

    onSelect = key => {
        this.setState({ selected: key }, () => {
            let key = 'hanman';
            switch (this.state.selected) {
                case '韩漫':
                    key = 'hanman'
                    break;
                case 'H漫':
                    key = 'hman';
                    break;
                case '动漫':
                    key = 'anime'
                    break;
            }
            Api.mangaRank(key, 1, 10, (e) => {
                let data = e.data;
                let nowPage = e.current_page;
                this.setState({
                    data,
                    nowPage,
                    totalPage: e.last_page
                });
            });
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const LeaderBoardWithRouter = withRouter(LeaderBoard);
export default LeaderBoardWithRouter;