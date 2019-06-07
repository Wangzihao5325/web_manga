import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import { ToastsStore } from 'react-toasts';
import Api from '../../socket/index';
import './index.css';
import InfiniteScroll from 'react-infinite-scroller';
import { Comic3Item } from '../../component/frontCover/index';

const textReg = { content: '' };

class KeyWordsItem extends PureComponent {

    static defaultProps = {
        title: '    ',
        value: ''
    }

    render() {
        let color = 'rgb(168,168,168)';
        let textColor = 'rgb(34,34,34)';
        let title = this.props.title.length > 10 ? this.props.title.slice(0, 10) : this.props.title;
        let length = title.length * 13 + 24;
        return (
            <div onClick={this.itemSelect} style={{ marginTop: 10, marginLeft: 5, marginRight: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 34, width: length, borderRadius: 17, backgroundColor: 'white', borderColor: color, borderStyle: 'solid', borderWidth: 1 }}>
                <div className='text_div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 12, marginRight: 12, color: textColor, fontSize: 13 }}>
                    {title}
                </div>
            </div>
        );
    }

    itemSelect = () => {
        if (this.props.clickCallback) {
            this.props.clickCallback(this.props.item);
        }
    }
}

class Search extends PureComponent {

    state = {
        searchHistory: [],
        isSearch: false,
        hotData: [],
        searchData: [],
        nowPage: -1,
        totalPage: -1,
        searchTitle: '',
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        if (window.localStorage.erokun_searchhistory) {
            let searchHistory = JSON.parse(window.localStorage.erokun_searchhistory);
            this.setState({
                searchHistory
            });
        }
        const type = this.props.match.params.type;
        Api.guessLike(type, 1, (e) => {
            let data = e.data;
            if (data.length > 6) {
                data.length = 6;
            }
            this.setState({
                hotData: data
            });
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >

                <div style={{ height: 38, marginTop: 5, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ marginLeft: 12, height: 34, width: CLIENT_WIDTH - 70, backgroundColor: 'rgb(244,244,244)', borderRadius: 17, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ marginLeft: 12, height: 34, width: 17, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 17, width: 17 }} src={require('../../image/main/search.png')} alt='' /></div>
                        <input onKeyUp={this.onKeyup} onChange={this.inputOnChange} style={{ marginLeft: 5, outline: 'none', height: 24, width: 150, borderColor: 'rgb(244,244,244)', borderStyle: 'solid', borderWidth: 1, backgroundColor: 'rgb(244,244,244)' }} type='text' placeholder='搜索关键词' />
                    </div>
                    <div onClick={this.goBack} style={{ fontSize: 15, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'rgb(34,34,34)' }}>
                        取消
                    </div>
                </div>

                {

                    !this.state.isSearch && this.state.searchHistory.length > 0 &&
                    <div style={{ marginTop: 10, alignSelf: 'center', display: 'flex', height: 30, width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ marginLeft: 12, color: 'rgb(168,168,168)', fontSize: 14 }}>搜索历史</div>
                        <div onClick={this.clearHistory} style={{ marginRight: 12, height: 30, width: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <img style={{ height: 16, width: 16 }} src={require('../../image/collect/delete.png')} alt='' />
                        </div>
                    </div >
                }

                {

                    !this.state.isSearch && this.state.searchHistory.length > 0 &&
                    <div style={{ alignSelf: 'center', display: 'flex', width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        {
                            this.state.searchHistory.map((element, index) => {
                                return <KeyWordsItem clickCallback={this.searchHistoryItemClick} key={index} item={element} title={element} />
                            })
                        }
                    </div >
                }

                {

                    !this.state.isSearch &&
                    <div style={{ marginTop: 10, alignSelf: 'center', display: 'flex', height: 30, width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ marginLeft: 12, color: 'rgb(168,168,168)', fontSize: 14 }}>热门搜索</div>
                        <div ></div>
                    </div >
                }

                {

                    !this.state.isSearch &&
                    <div style={{ alignSelf: 'center', display: 'flex', width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        {
                            this.state.hotData.map((item, index) => {
                                return <KeyWordsItem clickCallback={this.itemClick} key={index} item={item} value={item.id} title={item.title} />
                            })
                        }
                    </div >
                }

                {this.state.isSearch && this.state.searchData.length > 0 &&
                    <div className='scrolllist' style={{ flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <InfiniteScroll
                            pageStart={0}
                            hasMore={true}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}
                            loadMore={this._loadMore}
                        >
                            {
                                this.state.searchData.map((item, index) => {
                                    return <Comic3Item coverClick={() => this.itemClick(item)} isHiddenIndexTab={true} index={index} key={item.title} item={item} />;
                                })
                            }
                            <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                        </InfiniteScroll>
                    </div>
                }

                {
                    this.state.isSearch && this.state.searchData.length == 0 &&
                    <div style={{ marginTop: 55, width: CLIENT_WIDTH, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ height: 199, width: 235 }}><img style={{ height: 199, width: 235 }} src={require('../../image/collect/no_collect_data.png')} alt='' /></div>
                        <div style={{ color: 'rgb(160,160,160)', fontSize: 16, marginTop: 50 }}>哎呀呀,没有搜索到东西呢!</div>
                    </div>
                }

            </div>
        );
    }

    clearHistory = () => {
        window.localStorage.setItem('erokun_searchhistory', JSON.stringify([]));
        this.setState({
            searchHistory: []
        });
    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        const type = this.props.match.params.type;
        const title = this.state.searchTitle;
        Api.searchByType(type, title, this.state.nowPage + 1, 10, (e) => {
            this.setState({
                searchData: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page
            });
        });
    }
    searchHistoryItemClick = (title) => {
        const type = this.props.match.params.type;
        this.setState({
            isSearch: true,
            searchTitle: title
        });
        Api.searchByType(type, title, 1, 10, (e) => {
            this.setState({
                searchData: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page
            });
        });
    }

    itemClick = (item) => {
        this.props.history.push(`/manga_detail/${item.id}/${item.global_type}`)
    }

    inputOnChange = ({ target }) => {
        textReg.content = target.value;
        if (target.value === '' && this.state.isSearch) {
            this.setState({
                isSearch: false
            });
        }
    }

    onKeyup = (e) => {
        if (e.keyCode === 13) {
            const type = this.props.match.params.type;
            const title = textReg.content;
            this.setState({
                isSearch: true,
                searchTitle: title
            });
            Api.searchByType(type, title, 1, 10, (e) => {
                this.setState({
                    searchData: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page
                });
            });

            let history = [];
            if (window.localStorage.erokun_searchhistory) {
                history = JSON.parse(window.localStorage.erokun_searchhistory);
            }
            history.push(title);
            window.localStorage.setItem('erokun_searchhistory', JSON.stringify(history));
            this.setState((preState) => {
                let reg = [...preState.searchHistory];
                reg.push(title);
                return {
                    searchHistory: reg
                }
            });
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;