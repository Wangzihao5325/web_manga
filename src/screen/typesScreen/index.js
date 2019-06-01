import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import Api from '../../socket/index';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { InnerMenu, Menu, WIDTH as ITEM_WIDTH } from '../../component/tabSelect/TypeSelect';
import { FrontCover } from '../../component/frontCover';
import InfiniteScroll from 'react-infinite-scroller';

class TypeScreen extends PureComponent {

    state = {
        paySelect: -1,
        payData: [],
        sortSelect: -1,
        sortData: [],
        stateSelect: -1,
        stateData: [],
        typeSelect: -1,
        typeData: [],
        innerTypeSelect: -1,
        innerTypeData: [],
        nowPage: -1,
        totalPage: -1,
        mangaData: []
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.mangaType((e) => {
            this.setState({
                payData: e.pay,
                sortData: e.sort,
                stateData: e.state,
                typeData: e.type,
                paySelect: e.pay.length > 0 ? e.pay[0].name : -1,
                sortSelect: e.sort.length > 0 ? e.sort[0].name : -1,
                stateSelect: e.state.length > 0 ? e.state[0].name : -1,
                typeSelect: e.type.length > 0 ? e.type[0].name : -1,
                innerTypeData: e.type[0].children,
                innerTypeSelect: e.type[0].children.length > 0 ? e.type[0].children[0].title : -1
            });

        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.paySelect !== this.state.paySelect ||
            prevState.sortSelect !== this.state.sortSelect ||
            prevState.stateSelect !== this.state.stateSelect ||
            prevState.typeSelect !== this.state.typeSelect ||
            prevState.innerTypeSelect !== this.state.innerTypeSelect
        ) {
            let payKey = this.state.payData.filter((item) => {
                return item.name === this.state.paySelect
            })[0].key;
            let sortKey = this.state.sortData.filter((item) => {
                return item.name === this.state.sortSelect
            })[0].key;
            let stateKey = this.state.stateData.filter((item) => {
                return item.name === this.state.stateSelect
            })[0].key;
            let typeKey = this.state.typeData.filter((item) => {
                return item.name === this.state.typeSelect
            })[0].key;
            let innerTypeKey = this.state.innerTypeData.filter((item) => {
                return item.title === this.state.innerTypeSelect
            })[0].id;

            Api.mangaListByType(typeKey, innerTypeKey, payKey, stateKey, sortKey, 1, 12, (e) => {
                this.setState({
                    nowPage: e.current_page,
                    totalPage: e.last_page,
                    mangaData: e.data
                });
                console.log(e);
            });
        }
    }

    render() {
        const { paySelect, payData, sortSelect, sortData, stateSelect, stateData, typeSelect, typeData, innerTypeSelect, innerTypeData } = this.state;
        const payMenu = Menu(payData, paySelect);
        const payWidth = ITEM_WIDTH * payData.length < CLIENT_WIDTH ? ITEM_WIDTH * payData.length : CLIENT_WIDTH;
        const sortMenu = Menu(sortData, sortSelect);
        const sortWidth = ITEM_WIDTH * sortData.length < CLIENT_WIDTH ? ITEM_WIDTH * sortData.length : CLIENT_WIDTH;
        const stateMenu = Menu(stateData, stateSelect);
        const stateWidth = ITEM_WIDTH * stateData.length < CLIENT_WIDTH ? ITEM_WIDTH * stateData.length : CLIENT_WIDTH;
        const typeMenu = Menu(typeData, typeSelect);
        const typeWidth = ITEM_WIDTH * typeData.length < CLIENT_WIDTH ? ITEM_WIDTH * typeData.length : CLIENT_WIDTH;
        const innerTypeMenu = InnerMenu(innerTypeData, innerTypeSelect);
        const innerTypeWidth = ITEM_WIDTH * innerTypeData.length < CLIENT_WIDTH ? ITEM_WIDTH * innerTypeData.length : CLIENT_WIDTH;
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='分类' back={this.goBack} />
                <div style={{ height: 29, width: typeWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={typeMenu}
                        selected={typeSelect}
                        onSelect={this._typeSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: innerTypeWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={innerTypeMenu}
                        selected={innerTypeSelect}
                        onSelect={this._innerTypeSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: stateWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={stateMenu}
                        selected={stateSelect}
                        onSelect={this._stateSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: payWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={payMenu}
                        selected={paySelect}
                        onSelect={this._paySelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: sortWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={sortMenu}
                        selected={sortSelect}
                        onSelect={this._sortSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        threshold={250}
                        loadMore={this._loadMore}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {
                                this.state.mangaData.map((item, index) => {
                                    return <FrontCover key={index} title={item.title} intro={item.intro ? item.intro : ' '} source={item.cover_url} coverClick={() => { this.props.history.push(`/manga_detail/${item.id}/${item.global_type}`) }} />
                                })
                            }
                        </div>
                        {/* <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />*/}{/**底部垫高，防止正文部分被bottom遮挡 */}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

    _innerTypeSelect = (key) => {
        this.setState({
            innerTypeSelect: key
        });
    }

    _paySelect = (key) => {
        this.setState({
            paySelect: key
        });
    }

    _sortSelect = (key) => {
        this.setState({
            sortSelect: key
        });
    }

    _stateSelect = (key) => {
        this.setState({
            stateSelect: key
        });
    }

    _typeSelect = (key) => {
        this.setState((preState) => {
            let innerData = [];
            let innerSelect = -1;
            preState.typeData.every((item) => {
                if (item.name === key) {
                    innerData = item.children;
                    innerSelect = item.children.length > 0 ? item.children[0].title : -1;
                    return false;
                }
                return true;
            });
            return {
                typeSelect: key,
                innerTypeData: innerData,
                innerTypeSelect: innerSelect
            }
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const TypeScreenWithRouter = withRouter(TypeScreen);
export default TypeScreenWithRouter;