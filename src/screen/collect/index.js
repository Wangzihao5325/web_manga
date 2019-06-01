import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import store from '../../store/index';
import { tab_navi_show } from '../../store/actions/tabBottomNaviAction';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../component/tabSelect/ScrollTabSelect';
import { Menu as InnerMenu } from '../../component/tabSelect/CollectSelect';
import Api from '../../socket/index';
import SecurtyImage from '../../component/securtyImage/Image';
import InfiniteScroll from 'react-infinite-scroller';


const tabData = [{ name: '历史' }, { name: '收藏' }];
const mangaTypeData = [{ name: '韩漫' }, { name: 'H漫画' }, { name: '动漫' }];

class Item extends PureComponent {
    render() {
        return (
            <div style={{ height: 118, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: 110, width: CLIENT_WIDTH - 24, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ height: 110, width: 75 }}>
                        <SecurtyImage borderRadius={4} style={{ width: 75, height: 110 }} source={this.props.source} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginLeft: 17, marginTop: 11, color: 'rgb(44,44,44)', fontSize: 15, fontWeight: 'bold' }}>{this.props.title}</div>
                        <div style={{ marginTop: 15, color: 'rgb(168,168,168)', fontSize: 13, marginLeft: 17 }}>{`更新到:第${this.props.total}集`}</div>
                    </div>
                    <div onClick={this.goToSee} style={{ alignSelf: 'center', borderRadius: 15, borderStyle: 'solid', borderColor: 'rgb(255,29,35)', borderWidth: 1, height: 30, width: 58, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'rgb(255,29,35)', fontSize: 14 }}>续看</div>
                </div>
            </div>
        );
    }

    goToSee = () => {
        if (this.props.goOn) {
            this.props.goOn();
        }
    }
}

class Collect extends PureComponent {
    state = {
        selected: '历史',
        innerSelected: '韩漫',
        historyData: [],
        nowPage: -1,
        totalPage: -1
    }

    componentDidMount() {
        store.dispatch(tab_navi_show());
        Api.mangaHistory('hanman', 1, 15, (e) => {
            this.setState({
                historyData: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page
            });
        });
    }

    render() {
        const { selected, innerSelected } = this.state;
        const menu = Menu(tabData, selected);
        const innerMenu = InnerMenu(mangaTypeData, innerSelected);
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 47, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                    <div style={{ height: 46, width: 160 }} >
                        <ScrollMenu
                            data={menu}
                            selected={selected}
                            onSelect={this.onSelect}
                            itemStyle={{ outline: 'none' }}
                        />
                    </div>
                    <div style={{ fontWeight: 'bold', height: 43, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        编辑
                    </div>
                </div>

                <div style={{ height: 29, width: 190, marginTop: 10, marginLeft: 1 }}>
                    <ScrollMenu
                        dragging={false}
                        data={innerMenu}
                        selected={innerSelected}
                        onSelect={this.onInnerSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>

                <div style={{ marginTop: 20, flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        threshold={250}
                        loadMore={this._loadMore}
                    >
                        {
                            this.state.historyData.map((item, index) => {
                                return <Item goOn={() => { this.props.history.push(`/manga_detail/${item.id}/${item.global_type}`) }} key={index} source={item.cover_url} title={item.title} total={item.resource_total} />
                            })
                        }
                        {/* <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />*/}{/**底部垫高，防止正文部分被bottom遮挡 */}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return
        }
        let typeKey = 'hanman';
        switch (this.state.innerSelected) {
            case '韩漫':
                typeKey = 'hanman';
                break;
            case 'H漫画':
                typeKey = 'hman';
                break;
            case '动漫':
                typeKey = 'anime';
                break;
        }
        Api.mangaHistory(typeKey, this.state.nowPage + 1, 15, (e) => {
            let oldData = [...this.state.historyData];
            let newData = oldData.concat(e.data);
            this.setState({
                historyData: newData,
                nowPage: e.current_page,
                totalPage: e.last_page
            });
        });
    }

    onInnerSelect = (key) => {
        this.setState({
            innerSelected: key
        }, () => {
            let typeKey = 'hanman';
            switch (this.state.innerSelected) {
                case '韩漫':
                    typeKey = 'hanman';
                    break;
                case 'H漫画':
                    typeKey = 'hman';
                    break;
                case '动漫':
                    typeKey = 'anime';
                    break;
            }
            Api.mangaHistory(typeKey, 1, 15, (e) => {
                this.setState({
                    historyData: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page
                });
            });
        });
    }

    onSelect = (key) => {
        this.setState({
            selected: key
        });
    }
}

const CollectWithRouter = withRouter(Collect);
export default CollectWithRouter;