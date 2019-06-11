import React, { PureComponent } from 'react';
import Api from '../../socket/index';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import InfiniteScroll from 'react-infinite-scroller';
import { Menu as InnerMenu } from '../../component/tabSelect/CollectSelect';
import { typeUtil } from '../../global/utils';
import { FrontCoverWithSelect } from '../../component/frontCover/index';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import _ from 'lodash';
import './index.css';

// const mangaTypeData = [{ name: '韩漫' }, { name: 'H漫画' }, { name: '动漫' }];
const mangaTypeData = [{ name: '韩漫' }, { name: 'H漫画' }];

export default class Collect extends PureComponent {

    state = {
        isSelectAll: false,
        innerSelected: '韩漫',
        collectData: [],
        collectSelectArr: [],
        nowPage: -1,
        totalPage: -1
    }

    componentDidMount() {
        let typeKey = typeUtil(this.state.innerSelected);
        Api.mangaCollect(typeKey, 1, 15, (e) => {

            this.setState({
                collectData: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page
            });
        });
    }

    render() {
        const { innerSelected } = this.state;
        const innerMenu = InnerMenu(mangaTypeData, innerSelected);
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {!this.props.isEditMode &&
                    <div style={{ height: 29, width: 130, marginTop: 10, marginLeft: 1 }}>
                        <ScrollMenu
                            alignCenter={false}
                            dragging={false}
                            data={innerMenu}
                            selected={innerSelected}
                            onSelect={this.onInnerSelect}
                            itemStyle={{ outline: 'none' }}
                        />
                    </div>
                }

                <div className='scrolllist' style={{ marginTop: 20, flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        threshold={250}
                        loadMore={this._loadMore}
                    >
                        <div className='box' style={{ width: CLIENT_WIDTH - 24, height: '100vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'flex-start' }}>
                            {
                                this.state.collectData.length === 0 &&
                                <div style={{ marginTop: 55, width: CLIENT_WIDTH, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ height: 199, width: 235 }}><img style={{ height: 199, width: 235 }} src={require('../../image/collect/no_collect_data.png')} alt='' /></div>
                                    <div style={{ color: 'rgb(160,160,160)', fontSize: 16, marginTop: 50 }}>暂无收藏</div>
                                </div>
                            }
                            {//to do historyData修改
                                this.state.collectData.map((item, index) => {
                                    return (
                                        <FrontCoverWithSelect
                                            isHoList={true}
                                            wapperWidth={CLIENT_WIDTH - 24}
                                            index={index}
                                            id={item.id}
                                            editMode={this.props.isEditMode}
                                            isSelect={item.isSelect}
                                            key={index}
                                            title={item.title}
                                            intro={item.intro ? item.intro : ' '}
                                            source={item.cover_url}
                                            coverClick={() => { this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`) }}
                                            selectCallback={this._collectSelectCallback}
                                        />);
                                })
                            }
                        </div>
                    </InfiniteScroll>
                </div>
                <div style={{ height: 75, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                {this.props.isEditMode &&
                    <div
                        style={{
                            position: 'fixed',
                            left: 0,
                            bottom: 0,
                            height: 80,
                            width: '100%',
                            backgroundColor: 'white',
                            borderTopColor: 'red',
                            borderTopWidth: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            zIndex: 30
                        }}
                    >
                        <div style={{ marginLeft: 20, marginRight: 20, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ height: 30, width: 60, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={this._collectSelectAll}>
                                <div style={{ height: 30, width: 15, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 15, width: 15 }} src={this.state.isSelectAll ? require('../../image/collect/select_all.png') : require('../../image/collect/unSelect_all.png')} alt='' /></div>
                                <div style={{ fontSize: 15, color: 'rgb(34,34,34)', marginLeft: 8 }}>全选</div>
                            </div>
                            <div onClick={this.delete} style={{ fontSize: 15, color: 'rgb(168,168,168)' }}>删除</div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        let typeKey = typeUtil(this.state.innerSelected);
        Api.mangaCollect(typeKey, this.state.nowPage + 1, 15, (e) => {
            if (e.data.length > 0) {
                let dataReg = this.state.collectData.concat(e.data);
                this.setState((preState) => {
                    return {
                        collectData: dataReg,
                        nowPage: preState.nowPage + 1,
                        totalPage: preState.nowPage + 2
                    }
                });
            } else {
                this.setState((preState) => {
                    return {
                        totalPage: preState.nowPage
                    }
                });
            }
        });
    }

    _collectSelectCallback = (index, id, isSelect) => {
        let dataReg = [...this.state.collectData];
        dataReg[index].isSelect = !isSelect;
        let selectArrReg = [...this.state.collectSelectArr];
        if (isSelect) {
            _.pull(selectArrReg, id);
        } else {
            selectArrReg.push(id);
        }
        this.setState({
            collectData: dataReg,
            collectSelectArr: selectArrReg
        });
    }

    _collectSelectAll = () => {
        if (this.state.isSelectAll) {//已经全选 清除
            let dataReg = this.state.collectData.map((item) => {
                let reg = _.assign({}, item);
                reg.isSelect = false;
                return reg;
            });
            this.setState({
                collectData: dataReg,
                isSelectAll: false,
                collectSelectArr: []
            });
        } else {
            let selectArr = [];
            let dataReg = this.state.collectData.map((item) => {
                selectArr.push(item.id);
                let reg = _.assign({}, item);
                reg.isSelect = true;
                return reg;
            });
            this.setState({
                collectData: dataReg,
                isSelectAll: true,
                collectSelectArr: selectArr
            });
        }
    }

    delete = () => {
        if (this.state.collectSelectArr.length === 0) {
            return;
        }
        let typeKey = typeUtil(this.state.innerSelected);
        Api.deleteCollect(typeKey, this.state.collectSelectArr, (e, code, message) => {
            if (message === 'success') {
                Api.mangaCollect(typeKey, 1, 15, (e) => {
                    this.setState({
                        collectData: e.data,
                        nowPage: e.current_page,
                        totalPage: e.last_page,
                        collectSelectArr: []
                    });
                });
            }
        });
    }

    onInnerSelect = (key) => {
        this.setState({
            innerSelected: key
        }, () => {
            let typeKey = typeUtil(this.state.innerSelected);
            Api.mangaCollect(typeKey, 1, 15, (e) => {
                this.setState({
                    collectData: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page,
                    collectSelectArr: []
                });
            });
        });
    }
}