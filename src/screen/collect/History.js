import React, { PureComponent } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import InfiniteScroll from 'react-infinite-scroller';
import { Menu as InnerMenu } from '../../component/tabSelect/CollectSelect';
import { typeUtil } from '../../global/utils';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import Api from '../../socket/index';
import SecurtyImage from '../../component/securtyImage/Image';
import _ from 'lodash';
import './index.css';
import { ToastsStore } from 'react-toasts';

// const mangaTypeData = [{ name: '韩漫' }, { name: 'H漫画' }, { name: '动漫' }];
const mangaTypeData = [{ name: '韩漫' }, { name: 'H漫画' }];
class Item extends PureComponent {

    state = {
        isSelectAll: false,
        isSelect: false
    }

    render() {
        let text = this.props.over ? '已完结 共' : '更新到:第';
        return (
            <div ref={ele => this.ref = ele} style={{ height: 118, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: 110, width: CLIENT_WIDTH - 24, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ height: 110, width: 75 }}>
                        <SecurtyImage borderRadius={4} style={{ width: 75, height: 110 }} source={this.props.source} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className='one_line_title' style={{ width: CLIENT_WIDTH - 200, marginLeft: 17, marginTop: 11, color: 'rgb(44,44,44)', fontSize: 15, fontWeight: 'bold' }}>{this.props.title}</div>
                        <div style={{ marginTop: 15, color: 'rgb(168,168,168)', fontSize: 13, marginLeft: 17 }}>{`上次看到:第${this.props.last}话`}</div>
                        <div style={{ marginTop: 7, color: 'rgb(168,168,168)', fontSize: 13, marginLeft: 17 }}>{`${text}${this.props.total}话`}</div>
                    </div>
                    {!this.props.editMode && <div onClick={this.goToSee} style={{ alignSelf: 'center', borderRadius: 15, borderStyle: 'solid', borderColor: 'rgb(255,29,35)', borderWidth: 1, height: 30, width: 58, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'rgb(255,29,35)', fontSize: 14 }}>续看</div>}
                    {this.props.editMode &&
                        <div onClick={this.onClick} style={{ marginRight: 20, height: 21, width: 21, alignSelf: 'center' }}>
                            {!this.props.isSelect && <img style={{ height: 21, width: 21 }} src={require('../../image/collect/unselect.png')} alt='' />}
                            {this.props.isSelect && <img style={{ height: 21, width: 21 }} src={require('../../image/collect/select.png')} alt='' />}
                        </div>
                    }
                </div>
            </div>
        );
    }



    onClick = () => {
        if (this.props.selectCallback) {
            this.props.selectCallback(this.props.index, this.props.id, this.props.isSelect);
        }
    }

    goToSee = () => {
        if (this.props.goOn) {
            this.props.goOn();
        }
    }
}

export default class History extends PureComponent {

    state = {
        isSelectAll: false,
        innerSelected: '韩漫',
        historyData: [],
        historySelectArr: [],
        nowPage: -1,
        totalPage: -1
    }

    componentDidMount() {
        let typeKey = typeUtil(this.state.innerSelected);
        Api.mangaHistory(typeKey, 1, 15, (e) => {
            this.setState({
                historyData: e.data,
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
                            dragging={false}
                            data={innerMenu}
                            selected={innerSelected}
                            onSelect={this.onInnerSelect}
                            itemStyle={{ outline: 'none' }}
                        />
                    </div>
                }
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
                                return <Item over={item.dump_status} last={item.last_index} isSelect={item.isSelect} selectCallback={this._historySelectCallback} editMode={this.props.isEditMode} goOn={() => { this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`) }} key={index} index={index} source={item.cover_url} title={item.title} total={item.resource_total} id={item.id} />
                            })
                        }
                        <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                        {
                            this.state.historyData.length === 0 &&
                            <div style={{ width: CLIENT_WIDTH, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ height: 199, width: 235 }}><img style={{ height: 199, width: 235 }} src={require('../../image/collect/no_collect_data.png')} alt='' /></div>
                                <div style={{ color: 'rgb(160,160,160)', fontSize: 16, marginTop: 50 }}>暂无历史</div>
                            </div>
                        }
                    </InfiniteScroll>
                </div>

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
                            <div style={{ height: 30, width: 60, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={this._historySelectAll}>
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

    delete = () => {
        if (this.state.historySelectArr.length === 0) {
            return;
        }
        let typeKey = typeUtil(this.state.innerSelected);
        Api.deleteHistory(typeKey, this.state.historySelectArr, (e, code, message) => {
            if (message === 'success') {
                Api.mangaHistory(typeKey, 1, 15, (e) => {
                    this.setState({
                        historyData: e.data,
                        nowPage: e.current_page,
                        totalPage: e.last_page,
                        historySelectArr: []
                    });
                });
            }
        });
    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        let typeKey = typeUtil(this.state.innerSelected);
        Api.mangaHistory(typeKey, this.state.nowPage + 1, 15, (e) => {
            let dataReg = this.state.historyData.concat(e.data);
            this.setState({
                historyData: dataReg,
                nowPage: e.current_page,
                totalPage: e.last_page
            });
        });
    }

    _historySelectCallback = (index, id, isSelect) => {
        let dataReg = [...this.state.historyData];
        dataReg[index].isSelect = !isSelect;
        let selectArrReg = [...this.state.historySelectArr];
        if (isSelect) {
            _.pull(selectArrReg, id);
        } else {
            selectArrReg.push(id);
        }
        this.setState({
            historyData: dataReg,
            historySelectArr: selectArrReg
        });
    }

    _historySelectAll = () => {
        if (this.state.isSelectAll) {//已经全选 清除
            let dataReg = this.state.historyData.map((item) => {
                let reg = _.assign({}, item);
                reg.isSelect = false;
                return reg;
            });
            this.setState({
                historyData: dataReg,
                isSelectAll: false,
                historySelectArr: []
            });
        } else {
            let selectArr = [];
            let dataReg = this.state.historyData.map((item) => {
                selectArr.push(item.id);
                let reg = _.assign({}, item);
                reg.isSelect = true;
                return reg;
            });
            this.setState({
                historyData: dataReg,
                isSelectAll: true,
                historySelectArr: selectArr
            });
        }
    }

    onInnerSelect = (key) => {
        this.setState({
            innerSelected: key
        }, () => {
            let typeKey = typeUtil(this.state.innerSelected);
            Api.mangaHistory(typeKey, 1, 15, (e) => {
                this.setState({
                    historyData: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page,
                    historySelectArr: []
                });
            });
        });
    }
}