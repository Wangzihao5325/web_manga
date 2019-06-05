import React, { PureComponent, Component } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../../store/index';
import { tab_navi_unshow } from '../../../../store/actions/tabBottomNaviAction';
import InfiniteScroll from 'react-infinite-scroller';
import { HeaderPro } from '../../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../../global/sizes';
import Api from '../../../../socket/index';
import SecurtyImage from '../../../../component/securtyImage/Image';
import 'antd/dist/antd.css';
import { Drawer, Rate } from 'antd';
import { ToastsStore } from 'react-toasts';
import Modal from 'react-modal';
import _ from 'lodash';
import './index.css';


const dis_time = 5000;

class ImageItem extends PureComponent {
    render() {
        return (
            <div id={`manga_image_${this.props.index}`} style={{ display: 'flex' }}>
                <SecurtyImage source={this.props.source} style={{ display: 'flex', flexDirection: 'column' }} isFlexType={true} regWidth={CLIENT_WIDTH - 24} style={{}} />
            </div>
        );
    }
}

class Header extends PureComponent {
    render() {
        return (
            <div style={{ backgroundColor: 'rgb(34,34,34)', position: 'fixed', top: 0, left: 0, height: 38, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={this.goBack} style={{ height: 38, width: 70, marginLeft: 15, display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: 16, width: 8 }} src={require('../../../../image/detail/back_white.png')} alt='' />
                </div>
                <div className='text_div' style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='text_div' style={{ fontSize: 18, color: 'white' }}>{this.props.title}</div>
                </div>
                <div style={{ height: 38, width: 70, marginRight: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.rightBtnText && <div style={{ color: this.props.rightBtnTextColor ? this.props.rightBtnTextColor : 'white', fontSize: 16 }} onClick={this.rigthBtnClick}>{this.props.rightBtnText}</div>}
                </div>
            </div>
        );
    }

    goBack = () => {
        if (this.props.back) {
            this.props.back();
        }
    }

    rigthBtnClick = () => {
        if (this.props.rightBtnClick) {
            this.props.rightBtnClick();
        }
    }
}

class Bottom extends PureComponent {
    render() {
        return (
            <div style={{ height: 64, width: CLIENT_WIDTH, display: 'flex', backgroundColor: 'rgb(34,34,34)', position: 'fixed', bottom: 0, left: 0 }}>
                <div onClick={this.preChapter} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 23, width: 27 }} src={require('../../../../image/detail/manga_read_left_arrow.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>上一话</div>
                </div>
                <div onClick={this.collectCallback} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 27, width: 27 }} src={this.props.isCollect ? require('../../../../image/detail/heart.png') : require('../../../../image/detail/unheart.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>收藏</div>
                </div>
                <div onClick={this.starStateChange} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 27, width: 27 }} src={require('../../../../image/detail/star.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>评分</div>
                </div>
                <div onClick={this.draweShow} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 20, width: 24 }} src={require('../../../../image/detail/list.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>目录</div>
                </div>
                <div onClick={this.nextChapter} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 23, width: 27 }} src={require('../../../../image/detail/manga_read_right_arrow.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>下一话</div>
                </div>
            </div>
        );
    }

    starStateChange = () => {
        if (this.props.openStar) {
            this.props.openStar();
        }
    }

    collectCallback = () => {
        if (this.props.collectChange) {
            this.props.collectChange(this.props.isCollect);
        }
    }

    preChapter = () => {
        if (this.props.preChapter) {
            this.props.preChapter();
        }
    }

    nextChapter = () => {
        if (this.props.nextChapter) {
            this.props.nextChapter();
        }
    }

    draweShow = () => {
        if (this.props.drawShow) {
            this.props.drawShow();
        }
    }
}

class ChapterItem extends Component {
    render() {
        let coins = Math.abs(this.props.item.coins);
        return (
            <div onClick={this.itemOnClick} id={`chapter_list_${this.props.index}`} style={{ width: 281, height: 55, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 54, width: 250, borderBottomColor: 'rgb(50,50,50)', borderBottomWidth: 1, borderBottomStyle: 'solid' }}>
                    <div className='text_div' style={{ fontSize: 13, color: 'white' }}>{`${this.props.item.index}-${this.props.item.title}`}</div>
                    {
                        this.props.item.is_pay === 1 &&
                        <div style={{ alignSelf: 'center', width: 50, height: 20, marginRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgb(255,42,49)', fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><div style={{ fontSize: 14, color: 'white' }}>C</div></div>
                            <div style={{ color: 'rgb(255,42,49)', fontSize: 18 }}>{`${coins}`}</div>
                        </div>
                    }
                      {
                        this.props.item.is_pay === 0 &&
                        <div style={{ alignSelf: 'center', width: 50, height: 20, marginRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}/>
                    }
                </div>
            </div>
        );
    }
    itemOnClick = () => {
        if (this.props.itemClick) {
            this.props.itemClick(this.props.item, this.props.tureIndex);
        }
    }
}

class MangaRead extends PureComponent {
    state = {
        data: [],
        chapterListData: [],
        nowPage: -1,
        totalPage: -1,
        isControllerShow: true,
        isDrawerShow: false,
        title: '',
        totalChapter: 0,
        isEnd: 0,
        isEndText: '',
        order: true,
        nowChapterDataIndex: 0,        //当前章节在章节列表中的位置
        nowChapterIndex: 0,             //当前章节的话数
        isCollect: 0,               //是否收藏该漫画

        showModal: false,
        modalChapterCoins: 0,
        modalMyCoins: 0,
        modalAllChapterCoins: 0,
        modalTitle: '',
        modalChapterIndex: 0,
        modalChapterTrueIndex: 0,
        buyType: 'all',
        isAutoBuy: true,

        isShowStar: false,
        starValue: 2.5
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const id = parseInt(this.props.match.params.id);
        const source = parseInt(this.props.match.params.resource);
        const type = this.props.match.params.type;
        const mangaIndex = parseInt(this.props.match.params.index);
        Api.mangaImage(type, id, source, mangaIndex, 1, 10, (e) => {
            this.setState({
                data: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page,
            }, () => {
                this.timer = setTimeout(() => {
                    this.setState({
                        isControllerShow: false
                    });
                }, dis_time)
            });
        });
        Api.comicInfo(type, id, (e) => {
            let endText = '连载中';
            if (e.dump_status) {
                endText = '已完结';
            }
            this.setState({
                title: e.title,
                totalChapter: e.resource_total,
                isEnd: e.dump_status,
                isEndText: endText,
                isCollect: e.is_collect === 1 ? true : false,
            });
        });
        Api.comicResource(type, id, 'asc', 1, 1000, (e) => {
            this.setState({
                chapterListData: e.data
            });
            e.data.every((item, index) => {
                if (item.resource_id === source) {
                    let nowChapterDataIndex = index;
                    let nowChapterIndex = item.index;
                    let chapterTitle = item.title;
                    this.setState({
                        nowChapterDataIndex,
                        nowChapterIndex,
                        title: chapterTitle
                    });
                    return false;
                }
                return true;
            });
        });
    }

    componentDidUpdate(preProps) {
        const id = parseInt(preProps.match.params.id);
        const source = parseInt(preProps.match.params.resource);
        const newId = parseInt(this.props.match.params.id);
        const newSource = parseInt(this.props.match.params.resource);
        if (id !== newId || source !== newSource) {
            const type = this.props.match.params.type;
            const mangaIndex = parseInt(this.props.match.params.index);
            Api.mangaImage(type, newId, newSource, mangaIndex, 1, 10, (e) => {
                this.setState({
                    data: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page,
                    isShowStar: false
                });
            });
            Api.comicInfo(type, id, (e) => {
                let endText = '连载中';
                if (e.dump_status) {
                    endText = '已完结';
                }
                this.setState({
                    title: e.title,
                    totalChapter: e.resource_total,
                    isEnd: e.dump_status,
                    isEndText: endText,
                    isCollect: e.is_collect === 1 ? true : false,
                });
            });

            this.state.chapterListData.every((item, index) => {
                if (item.resource_id === newSource) {
                    let nowChapterDataIndex = index;
                    let nowChapterIndex = item.index;
                    let chapterTitle = item.title;
                    this.setState({
                        nowChapterDataIndex,
                        nowChapterIndex,
                        title: chapterTitle
                    });
                    return false;
                }
                return true;
            });
        }
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                {this.state.isControllerShow && <Header title={`第${this.state.nowChapterIndex}话`} back={this.goBack} rightBtnText='分享' rigthBtnClick={this.share} />}
                <div onClick={this.controllerStateChange} style={{ height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        threshold={250}
                        loadMore={this._loadMore}
                    >
                        {
                            this.state.data.map((item, index) => {
                                return <ImageItem source={item.image_url} key={index} index={index} />
                            })
                        }
                        {/* <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />*/}{/**底部垫高，防止正文部分被bottom遮挡 */}
                    </InfiniteScroll>
                </div>
                <Drawer
                    bodyStyle={{ backgroundColor: 'rgb(34,34,34)', padding: 0 }}
                    placement="right"
                    closable={false}
                    onClose={this.draweOnClose}
                    visible={this.state.isDrawerShow}
                    width={281}
                >
                    <div className='text_div' style={{ position: 'fixed', top: 0, right: 0, height: 42, width: 281, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'rgb(34,34,34)' }}>
                        {this.state.title}
                    </div>

                    <div style={{ position: 'fixed', top: 42, right: 0, paddingLeft: 24, paddingRight: 24, backgroundColor: 'rgb(19,19,19)', height: 38, width: 281, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 13, color: 'rgb(168,168,168)' }}>{`共话${this.state.totalChapter} ${this.state.isEndText}`}</div>
                        <div style={{ height: 20, width: 80, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div onClick={this.normalOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: this.state.order ? 'rgb(255,42,49)' : 'rgb(168,168,168)' }}>
                                正序
                        </div>
                            <div style={{ height: 16, width: 1, backgroundColor: 'rgb(168,168,168)' }} />
                            <div onClick={this.unnormalOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: this.state.order ? 'rgb(168,168,168)' : 'rgb(255,42,49)' }}>
                                倒序
                        </div>
                        </div>
                    </div>
                    <div className='scrolllist' style={{ marginTop: 80, background: 'rgb(34,34,34)' }} >
                        {
                            this.state.chapterListData.map((item, index) => {
                                return <ChapterItem itemClick={this.changeChapter} key={index} item={item} index={item.index} tureIndex={index} />;
                            })
                        }
                    </div>
                </Drawer>
                {this.state.isControllerShow && <Bottom openStar={this.openStar} isCollect={this.state.isCollect} collectChange={this.collectChange} drawShow={this.drawOnShow} preChapter={this.goToPre} nextChapter={this.goToNext} />}

                <Modal
                    className="Modal"
                    overlayClassName="Overlay"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal}
                    isOpen={this.state.showModal}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: 20, color: 'rgb(0,0,0)', fontSize: 14, alignSelf: 'center' }}>{`${this.state.modalTitle}${this.state.modalChapterIndex}话`}</div>
                        {this.state.modalChapterCoins > 0 &&
                            <div onClick={this.buyOne} style={{ alignSelf: 'center', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 44, width: CLIENT_WIDTH - 80, borderRadius: 22, borderStyle: 'solid', borderWidth: 1, borderColor: this.state.buyType === 'one' ? 'rgb(255,42,49)' : 'rgb(168,168,168)', color: this.state.buyType === 'one' ? 'rgb(255,42,49)' : 'rgb(168,168,168)' }}>
                                {`${this.state.modalChapterCoins} C币购买此话`}
                            </div>
                        }
                        {this.state.modalChapterCoins > 0 &&
                            <div onClick={this.buyAll} style={{ alignSelf: 'center', marginTop: 13, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 44, width: CLIENT_WIDTH - 80, borderRadius: 22, borderStyle: 'solid', borderWidth: 1, borderColor: this.state.buyType === 'all' ? 'rgb(255,42,49)' : 'rgb(168,168,168)', color: this.state.buyType === 'all' ? 'rgb(255,42,49)' : 'rgb(168,168,168)' }}>
                                {`${this.state.modalAllChapterCoins} C币购买全部`}
                            </div>
                        }
                        {this.state.modalChapterCoins > 0 &&
                            <div style={{ alignSelf: 'center', width: CLIENT_WIDTH - 80, height: 40, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ height: 14, width: 14, borderRadius: 7, backgroundColor: 'rgb(255,42,49)', fontSize: 12, color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>C</div>
                                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginLeft: 5 }}>{`币余额:${this.state.modalMyCoins}`}</div>
                                </div>
                                <div onClick={this.autoBuy} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ height: 40, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={this.state.isAutoBuy ? require('../../../../image/collect/select_all.png') : require('../../../../image/collect/unSelect_all.png')} alt='' /></div>
                                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginLeft: 5 }}>下章自动购买</div>
                                </div>
                            </div>
                        }
                        {this.state.modalChapterCoins > 0 &&
                            <div style={{ alignSelf: 'center', height: 44, width: CLIENT_WIDTH - 80, display: 'flex', flexDirection: 'row' }}>
                                <div onClick={this.earnMoney} style={{ borderTopLeftRadius: 22, borderBottomLeftRadius: 22, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(34,34,34)', color: 'white', fontSize: 14 }}>去赚C币</div>
                                <div onClick={this.buyNow} style={{ borderTopRightRadius: 22, borderBottomRightRadius: 22, flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(255,42,49)', color: 'white', fontSize: 14 }}>立即购买</div>
                            </div>
                        }
                        {
                            this.state.modalChapterCoins === 0 &&
                            <div style={{ color: 'rgb(168,168,168)', fontSize: 14, alignSelf: 'center', marginTop: 50 }}>正在获取购买信息ing...</div>
                        }
                    </div>
                </Modal>
                {
                    this.state.isShowStar &&
                    <div onClick={this.closeStar} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <div onClick={this.starContentClick} style={{ position: 'relative', width: 276, height: 290, display: 'flex', flexDirection: 'column-reverse' }}>
                            <div style={{ height: 96, width: 96, position: 'absolute', top: 0, left: 90, zIndex: 2 }}><img style={{ height: 96, width: 96 }} src={require('../../../../image/detail/star_header.png')} alt='' /></div>
                            <div style={{ alignItems: 'center', width: 276, height: 242, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 5 }}>
                                <div style={{ fontSize: 20, color: 'rgb(34,34,34)', marginTop: 53 }} >小主打个分呗</div>
                                <div style={{ marginBottom: 20, fontSize: 14, color: 'rgb(168,168,168)', marginTop: 5 }}>求你了~~喵 么么哒爱你</div>
                                <Rate allowHalf value={this.state.starValue} onChange={this.starValueChange} />
                                <div style={{ marginTop: 20, fontSize: 18, color: 'rgb(255,29,35)' }} onClick={this.submitStar}>好哒</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    starContentClick = (event) => {
        event.stopPropagation()
    }

    starValueChange = (value) => {
        this.setState({
            starValue: value
        });
    }

    openStar = () => {
        this.setState({
            isShowStar: true
        });
    }

    closeStar = () => {
        this.setState({
            isShowStar: false
        });
    }

    submitStar = () => {
        ToastsStore.success('评分成功!');
        this.setState({
            isShowStar: false
        });
    }

    collectChange = (isCollect) => {
        const global_type = this.props.match.params.type;
        const id = parseInt(this.props.match.params.id);
        if (isCollect) {
            Api.deleteCollect(global_type, [id], (e, code, message) => {
                if (message = 'success') {
                    this.setState({
                        isCollect: false
                    });
                    ToastsStore.success('取消收藏成功');
                } else {
                    ToastsStore.success('取消收藏失败');
                }
            })
        } else {
            Api.addCollect(global_type, id, (e, code, message) => {
                if (message = 'success') {
                    this.setState({
                        isCollect: true
                    });
                    ToastsStore.success('收藏成功');
                } else {
                    ToastsStore.success('收藏失败');
                }
            });
        }
    }

    buyNow = () => {
        let buyType = this.state.buyType;
        if (buyType === 'none') {
            ToastsStore.warning('您的C币不够啦,快去赚取金币吧!');
            return;
        }
        const globalType = this.props.match.params.type;
        let tureIndex = this.state.modalChapterTrueIndex;
        let itemObj = this.state.chapterListData[tureIndex];
        Api.resourceCoins(buyType, globalType, itemObj.id, itemObj.resource_id, itemObj.index, (e, code, message) => {
            if (message === 'success') {
                if (buyType === 'one') {
                    let dataReg = [...this.state.chapterListData];
                    dataReg[tureIndex].is_pay = 0;
                    this.setState({
                        chapterListData: dataReg
                    });
                } else if (buyType === 'all') {
                    let dataReg = this.state.chapterListData.map((item) => {
                        let reg = _.assign({}, item);
                        reg.is_pay = 0;
                        return reg;
                    });
                    this.setState({
                        chapterListData: dataReg
                    });
                }
                ToastsStore.success('购买成功，正为您跳转...');
                this.closeModal();
                this.props.history.push(`/manga_read/${itemObj.id}/${itemObj.resource_id}/${itemObj.index}/${globalType}`);
            }
        });
    }

    earnMoney = () => {
        this.props.history.replace('/task/');
    }

    autoBuy = () => {
        this.setState({
            isAutoBuy: !this.state.isAutoBuy
        });
    }

    buyOne = () => {
        if (this.state.buyType === 'none') {
            ToastsStore.warning('您的C币不够啦,快去赚取金币吧!');
            return;
        }
        this.setState({
            buyType: 'one'
        });
    }

    buyAll = () => {
        if (this.state.modalAllChapterCoins <= this.state.modalMyCoins) {
            this.setState({
                buyType: 'all'
            });
        } else {
            ToastsStore.warning('您的C币不够啦,快去赚取金币吧!');
        }
    }

    openModal = (id, sourceId, title, index, trueIndex) => {
        const globalType = this.props.match.params.type;
        this.setState({
            showModal: true,
            modalTitle: title,
            modalChapterIndex: index,
            modalChapterTrueIndex: trueIndex
        }, () => {
            Api.mangaImage(globalType, id, sourceId, index, 1, 10, (e, code, message) => {
                if (code === 200) {
                    let oneCoins = Math.abs(e.one_coins);
                    let allCoins = Math.abs(e.all_coins);
                    let myCoins = parseInt(e.coins);
                    let selectType = 'all';
                    if (myCoins < oneCoins) {
                        selectType = 'none';
                    } else if (myCoins >= oneCoins && myCoins < allCoins) {
                        selectType = 'one';
                    } else {
                        selectType = 'all';
                    }
                    this.setState({
                        modalChapterCoins: oneCoins,
                        modalMyCoins: myCoins,
                        modalAllChapterCoins: allCoins,
                        buyType: selectType
                    });
                } else if (code === 0) {
                    this.props.history.replace(`/manga_read/${id}/${sourceId}/${index}/${globalType}`);
                }
            });
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            modalChapterCoins: 0,
            modalMyCoins: 0,
            modalAllChapterCoins: 0,
            modalTitle: '',
            modalChapterIndex: 0,
            modalChapterTrueIndex: 0,
            buyType: 'all',
        });
    }

    goToNext = () => {
        if (this.state.nowChapterDataIndex === this.state.chapterListData.length - 1) {
            ToastsStore.warning('已经是最后一话啦！');
            return;
        }

        const isPay = this.state.chapterListData[this.state.nowChapterDataIndex + 1].is_pay;
        if (isPay) {
            let item = this.state.chapterListData[this.state.nowChapterDataIndex + 1];
            this.openModal(item.id, item.resource_id, item.title, item.index, this.state.nowChapterDataIndex + 1);
        } else {
            const newSourceId = this.state.chapterListData[this.state.nowChapterDataIndex + 1].resource_id;
            const id = parseInt(this.props.match.params.id);
            const newIndex = this.state.chapterListData[this.state.nowChapterDataIndex + 1].index;

            this.props.history.replace(`/manga_read/${id}/${newSourceId}/${newIndex}/${this.props.match.params.type}`);
            this.draweOnClose();
            let anchorElement = document.getElementById('manga_image_0');
            if (anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
                anchorElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    }

    goToPre = () => {
        if (this.state.nowChapterDataIndex === 0) {
            ToastsStore.warning('已经是最初话啦！');
            return;
        }

        const isPay = this.state.chapterListData[this.state.nowChapterDataIndex - 1].is_pay;
        if (isPay) {
            let item = this.state.chapterListData[this.state.nowChapterDataIndex - 1];
            this.openModal(item.id, item.resource_id, item.title, item.index, this.state.nowChapterDataIndex - 1);
        } else {
            const newSourceId = this.state.chapterListData[this.state.nowChapterDataIndex - 1].resource_id;
            const id = parseInt(this.props.match.params.id);
            const newIndex = this.state.chapterListData[this.state.nowChapterDataIndex - 1].index;

            this.props.history.replace(`/manga_read/${id}/${newSourceId}/${newIndex}/${this.props.match.params.type}`);
            this.draweOnClose();
            let anchorElement = document.getElementById('manga_image_0');
            if (anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
                anchorElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    }

    changeChapter = (item, tureIndex) => {
        if (item.is_pay) {
            this.openModal(item.id, item.resource_id, item.title, item.index, tureIndex);
            this.draweOnClose();
        } else {
            this.props.history.replace(`/manga_read/${item.id}/${item.resource_id}/${item.index}/${this.props.match.params.type}`);
            this.draweOnClose();
            let anchorElement = document.getElementById('manga_image_0');
            if (anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
                anchorElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    }

    normalOrder = () => {
        this.setState((preState) => {
            let newData = preState.chapterListData.reverse();
            return {
                order: true,
                chapterListData: newData
            }
        });
    }

    unnormalOrder = () => {
        this.setState((preState) => {
            let newData = preState.chapterListData.reverse();
            return {
                order: false,
                chapterListData: newData
            }
        });
    }

    drawOnShow = () => {
        this.setState({
            isDrawerShow: true
        }, () => {
            let anchorElement = document.getElementById(`chapter_list_${this.state.nowChapterIndex}`);
            if (anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
                anchorElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        });
    }

    draweOnClose = () => {
        this.setState({
            isDrawerShow: false
        });
    }

    controllerStateChange = () => {
        if (this.state.isDrawerShow) {
            return;
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.state.isControllerShow) {
            this.setState({
                isControllerShow: false
            });
        } else {
            this.setState({
                isControllerShow: true
            }, () => {
                this.timer = setTimeout(() => {
                    this.setState({
                        isControllerShow: false
                    });
                }, dis_time);
            });
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    share = () => {

    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        const id = parseInt(this.props.match.params.id);
        const source = parseInt(this.props.match.params.resource);
        const type = this.props.match.params.type;
        const newPage = this.state.nowPage + 1;
        const mangaIndex = parseInt(this.props.match.params.index);
        Api.mangaImage(type, id, source, mangaIndex, newPage, 10, (e) => {
            let regData = [...this.state.data];
            let newData = regData.concat(e.data);
            this.setState({
                data: newData,
                nowPage: e.current_page,
                totalPage: e.last_page,
            });
        });
    }
}

const MangaReadWithRouter = withRouter(MangaRead);
export default MangaReadWithRouter;