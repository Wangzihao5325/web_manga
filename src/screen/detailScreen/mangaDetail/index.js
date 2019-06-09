import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { pop_show } from '../../../store/actions/popAction';
import { auto_buy_change } from '../../../store/actions/readAction';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';
import SecurtyImage from '../../../component/securtyImage/Image';
import './index.css';
import 'antd/dist/antd.css';
import { Rate } from 'antd';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import InfiniteScroll from 'react-infinite-scroller';
import { FrontCover, VER_WIDTH, VER_HEIGHT } from '../../../component/frontCover/index';
import { ToastsStore } from 'react-toasts';
import Modal from 'react-modal';
import _ from 'lodash';


class MangaInfoHeader extends PureComponent {

    state = {
        tabs: []
    }

    componentDidMount() {
        let tabDataArr = [];
        if (this.props.item.is_new) {
            tabDataArr.push({ title: '新作', color: 'rgb(255,163,163)' });
        }
        if (this.props.item.is_recommend) {
            tabDataArr.push({ title: '推荐', color: 'rgb(158,244,255)' });
        }
        if (this.props.item.is_pay) {
            tabDataArr.push({ title: '免费', color: 'rgb(255,196,174)' });
        }
        if (this.props.item.dump_status) {
            tabDataArr.push({ title: '完结', color: 'rgb(218,174,255)' });
        }
        this.setState({
            tabs: tabDataArr
        });
    }

    render() {
        let hotNum = this.props.item.hot ? this.props.item.hot : 0;
        let score = this.props.item.score ? this.props.item.score : 0;
        let rateScore = parseInt((score.toFixed(0) / 2).toFixed(0));
        return (
            <div style={{ height: 330, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div onClick={this.backBtnClick} style={{ zIndex: 20, height: 38, width: 38, position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 16, width: 8 }} src={require('../../../image/usual/usual_left_arrow_2.png')} alt='' />
                </div>
                <div style={{ zIndex: 10, position: 'absolute', top: 81, left: 20, height: 178, width: CLIENT_WIDTH - 40, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ height: 178, width: 121, display: 'flex', flexDirection: 'column' }}>
                        <SecurtyImage borderRadius={4} style={{ height: 178, width: 121 }} source={this.props.item.cover_url} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} >
                        <div className='text_div' style={{ fontSize: 21, color: 'white', marginLeft: 20, marginTop: 10, fontWeight: 'bold', width: CLIENT_WIDTH - 181 }}>{this.props.item.title}</div>
                        <div style={{ marginTop: 20, marginLeft: 20, height: 20, width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ height: 20, width: 20 }}><img style={{ height: 20, width: 20 }} src={require('../../../image/main/first_fire.png')} alt='' /></div>
                            <div style={{ color: 'rgb(255,42,49)', fontSize: 16, marginLeft: 5, fontWeight: 'bold' }}>{hotNum}</div>
                        </div>
                        <div style={{ marginTop: 22, marginLeft: 20, width: CLIENT_WIDTH - 181, display: 'flex', flexDirection: 'row' }}>
                            <Rate disabled defaultValue={rateScore} />
                            <div style={{ color: 'rgb(168,168,168)', fontSize: 19, fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>{score}</div>
                        </div>
                        <div style={{ display: 'flex', width: CLIENT_WIDTH - 181, flexDirection: 'row', marginLeft: 20, marginTop: 13 }}>
                            {this.state.tabs.map((item, index) => {
                                return <div key={index} style={{ borderRadius: 3, marginRight: 4, height: 18, width: 35, backgroundColor: item.color, color: 'white', fontSize: 11, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>{item.title}</div>
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ height: 175, width: CLIENT_WIDTH, overflow: 'hidden' }}>
                    <div className='blur' style={{ height: 175, width: CLIENT_WIDTH }}>
                        <SecurtyImage style={{ height: 175, width: CLIENT_WIDTH }} source={this.props.item.cover_url} />
                    </div>
                </div>
                <div className='intro' style={{ marginTop: 84 + 26, width: CLIENT_WIDTH - 40, height: 47, alignSelf: 'center', color: 'rgb(127,127,127)', fontSize: 15 }}>{this.props.item.intro}</div>
            </div>
        );
    }

    backBtnClick = () => {
        if (this.props.goback) {
            this.props.goback();
        }
    }
}

class ChapterCoverItem extends PureComponent {
    render() {
        //let dateStr = this.props.item.online_at.split(' ')[0];
        let dateStr = this.props.item.online_at;
        let coins = Math.abs(this.props.item.coins);
        return (
            <div onClick={this.itemClick} style={{ height: 75, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row' }}>
                <div style={{ height: 65, width: 108, marginLeft: 20, position: 'relative' }}>
                    {
                        this.props.item.is_pay === 1 &&
                        <div style={{ color: 'rgb(255,42,49)', fontWeight: 'bold', position: 'absolute', top: 0, left: 0, height: 65, width: 108, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            C币购买
                        </div>
                    }
                    <SecurtyImage borderRadius={4} style={{ height: 65, width: 108 }} source={this.props.item.cover_url} />
                </div>
                <div style={{ height: 65, width: 120, marginLeft: 13, display: 'flex', flexDirection: 'column' }}>
                    <div className='text_div' style={{ marginTop: 6, fontSize: 14, color: 'rgb(34,34,34)' }}>{`第${this.props.item.index}话-${this.props.item.title}`}</div>
                    <div className='text_div' style={{ marginTop: 9, fontSize: 12, color: 'rgb(168,168,168)' }}>{`${dateStr}`}</div>
                </div>
                <div style={{ flex: 1 }} />
                {
                    this.props.item.is_pay === 1 &&
                    <div style={{ alignSelf: 'center', width: 50, height: 20, marginRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <div style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgb(255,42,49)', fontSize: 18, color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>C</div>
                        <div style={{ color: 'rgb(255,42,49)', fontSize: 18 }}>{`${coins}`}</div>
                    </div>
                }
            </div>
        );
    }

    itemClick = () => {
        if (this.props.itemClick) {
            this.props.itemClick(this.props.item.is_pay, this.props.item.id, this.props.item.resource_id, this.props.item.title, this.props.item.index, Math.abs(this.props.item.coins), this.props.index);
        }
    }
}

class HmanItem extends PureComponent {
    render() {
        let normalStyle = { position: 'relative', marginTop: 5, borderRadius: 4, color: 'rgb(34,34,34)', height: 63, width: 63, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(244,244,244)' };
        let marginWidth = (this.props.warpWidth - 63 * 5) / 8;
        if (this.props.index % 5 == 0) {
            normalStyle = { ...normalStyle, marginRight: marginWidth };
        } else if (this.props.index % 5 == 4) {
            normalStyle = { ...normalStyle, marginLeft: marginWidth };
        } else {
            normalStyle = { ...normalStyle, marginLeft: marginWidth, marginRight: marginWidth };
        }
        return (
            <div onClick={this.itemClick} style={normalStyle}>
                {
                    this.props.item.is_pay === 1 &&
                    <div style={{ position: 'absolute', top: 0, right: 0, height: 20, width: 20, borderTopRightRadius: 4, borderBottomLeftRadius: 4, backgroundColor: 'rgb(255,42,49)', fontSize: 18, color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>C</div>
                }
                {this.props.item.index}
            </div>
        );
    }

    itemClick = () => {
        if (this.props.itemClick) {
            this.props.itemClick(this.props.item.is_pay, this.props.item.id, this.props.item.resource_id, this.props.item.title, this.props.item.index, Math.abs(this.props.item.coins), this.props.index);
        }
    }
}

const GuessLike_WIDTH = CLIENT_WIDTH - 24;
const GuessLike_HEIGHT = VER_HEIGHT + 50;

class GuessLike extends PureComponent {
    render() {
        const items = this.itemsGen(this.props.data);
        return (
            <div style={{ alignSelf: 'center', height: GuessLike_HEIGHT, width: GuessLike_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 10, marginBottom: 10, height: 30, width: GuessLike_WIDTH, display: 'flex', flexDirection: 'column', fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>
                    猜你喜欢
                </div>
                <div style={{ height: VER_HEIGHT, width: GuessLike_WIDTH }}>
                    <ScrollMenu
                        alignCenter={false}
                        data={items}
                        onSelect={this.onSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
            </div>
        );
    }

    itemsGen = (data) => {
        let result = data.map((item, index) => {
            return <FrontCover isHo={true} key={index} title={item.title} intro={item.intro} source={item.cover_url} coverClick={() => { this.props.navi.replace(`/manga_detail/${item.id}/${this.props.globalType}`) }} />;
        });
        return result;
    }
}

class MangaDetail extends PureComponent {

    state = {
        mangaInfoObj: null,
        isMoreChapterState: false,
        order: true,
        nowPage: -1,
        totalPage: -1,
        data: [],
        guessLikeData: [],

        showModal: false,
        modalTitle: '',
        modalChapterIndex: 0,
        modalChapterCoins: 0,
        modalMyCoins: '0',
        modalAllChapterCoins: 0,

        modalId: -1,
        modalSourceId: -1,
        modalIndex: -1,
        modalTureIndex: 0,

        buyType: 'all'
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const mangaId = this.props.match.params.id;
        const global_type = this.props.match.params.type;
        //查询漫画详情
        Api.comicInfo(global_type, mangaId, (e) => {
            this.setState({
                mangaInfoObj: e
            });
        });
        //漫画列表查询
        Api.comicResource(global_type, mangaId, 'asc', 1, 5, (e) => {
            this.setState({
                nowPage: e.current_page,
                totalPage: e.last_page,
                data: e.data
            });
        });
        //猜你喜欢查询
        Api.guessLike(global_type, mangaId, (e) => {
            this.setState({
                guessLikeData: e.data
            })
        });
    }

    componentDidUpdate(preProps) {
        const mangaId = preProps.match.params.id;
        const newMangaId = this.props.match.params.id;
        if (mangaId !== newMangaId) {
            const global_type = this.props.match.params.type;
            //查询漫画详情
            Api.comicInfo(global_type, newMangaId, (e) => {
                this.setState({
                    mangaInfoObj: e
                });
            });
            //漫画列表查询
            let orderKey = this.state.order ? 'asc' : 'desc';
            Api.comicResource(global_type, newMangaId, orderKey, 1, 5, (e) => {
                this.setState({
                    nowPage: e.current_page,
                    totalPage: e.last_page,
                    data: e.data
                });
            });
            //猜你喜欢查询
            Api.guessLike(newMangaId, (e) => {
                this.setState({
                    guessLikeData: e.data
                })
            });
        }
    }

    render() {
        let isEnd = false;
        let text = '连载中';
        let totalNum = 0;
        let isCollect = false;
        if (this.state.mangaInfoObj) {
            isEnd = this.state.mangaInfoObj.dump_status === 1 ? true : false;
            totalNum = this.state.mangaInfoObj.resource_total;
            isCollect = this.state.mangaInfoObj.is_collect === 1 ? true : false;
        }
        if (isEnd) {
            text = '已完结';
        }

        let modalTitle = this.state.modalTitle.length > 15 ? `${this.state.modalTitle.slice(0, 13)}...` : this.state.modalTitle;

        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                {/* <HeaderPro title=' ' back={this.goBack} /> */}

                {this.state.mangaInfoObj && <MangaInfoHeader goback={this.goBack} item={this.state.mangaInfoObj} />}
                {
                    this.state.mangaInfoObj && this.props.match.params.type === 'hanman' &&
                    <div style={{ marginTop: 10, marginBottom: 20, height: 20, width: CLIENT_WIDTH - 40, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ fontSize: 13, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>{`${text}`}</div>
                            <div style={{ fontSize: 13, color: 'rgb(255,42,49)', fontWeight: 'bold' }}>{`(更新至${totalNum}话)`}</div>
                        </div>
                        <div style={{ height: 20, width: 80, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div onClick={this.normalOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: this.state.order ? 'rgb(255,42,49)' : 'rgb(34,34,34)' }}>
                                正序
                        </div>
                            <div style={{ height: 16, width: 1, backgroundColor: 'rgb(168,168,168)' }} />
                            <div onClick={this.unnormalOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: this.state.order ? 'rgb(34,34,34)' : 'rgb(255,42,49)' }}>
                                倒序
                        </div>
                        </div>
                    </div>
                }
                {this.props.match.params.type === 'hanman' &&
                    this.state.data.map((item, index) => {
                        return <ChapterCoverItem key={index} item={item} index={index} itemClick={this.goToMangaRead} />
                    })
                }
                {
                    this.state.data.length > 0 && this.props.match.params.type === 'hanman' &&
                    <div onClick={this.moreChapter} style={{ height: 20, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div><img style={{ height: 14, width: 14 }} src={require('../../../image/detail/more_chapter.png')} alt='' /></div>
                        <div style={{ fontSize: 15, color: 'rgb(255,42,49)', marginLeft: 2 }}>{this.state.isMoreChapterState ? '收起目录' : '展开目录'}</div>
                    </div>
                }

                {
                    this.state.mangaInfoObj && this.props.match.params.type === 'hman' &&
                    <div style={{ marginTop: 10, marginBottom: 20, height: 20, width: CLIENT_WIDTH - 40, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ fontSize: 13, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>{`${text}`}</div>
                            <div style={{ fontSize: 13, color: 'rgb(255,42,49)', fontWeight: 'bold' }}>{`(更新至${totalNum}话)`}</div>
                        </div>
                        <div style={{ height: 20, width: 40, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div onClick={this.moreChapter} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: this.state.order ? 'rgb(255,42,49)' : 'rgb(34,34,34)' }}>
                                {this.state.isMoreChapterState ? '收起' : '更多'}
                            </div>
                        </div>
                    </div>
                }
                {this.props.match.params.type === 'hman' &&
                    <div style={{ width: CLIENT_WIDTH - 20, alignSelf: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            this.state.data.map((item, index) => {
                                return <HmanItem warpWidth={CLIENT_WIDTH - 20} key={index} item={item} index={index} itemClick={this.goToMangaRead} />
                            })
                        }
                    </div>
                }

                {//猜你喜欢
                    this.state.guessLikeData.length > 0 &&
                    <GuessLike navi={this.props.history} data={this.state.guessLikeData} globalType={this.props.match.params.type} />
                }
                <div style={{ height: 80, width: CLIENT_WIDTH }} />
                <div style={{ backgroundColor: 'white', height: 80, width: CLIENT_WIDTH, position: 'fixed', left: 0, bottom: 0, display: 'flex', flexDirection: 'row', zIndex: 100 }}>
                    <div onClick={this.addCollect}><img style={{ height: 80, width: 80 }} src={isCollect ? require('../../../image/detail/like.png') : require('../../../image/detail/unLike.png')} alt='' /></div>
                    <div onClick={this.readNow} style={{ fontSize: 16, color: 'white', marginTop: 10, borderTopLeftRadius: 4, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: 'rgb(255,42,49)', height: 50, width: 268, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        立即阅读
                    </div>
                </div>

                <Modal
                    className="Modal"
                    overlayClassName="Overlay"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal}
                    isOpen={this.state.showModal}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: 20, color: 'rgb(0,0,0)', fontSize: 14, alignSelf: 'center' }}>{`${modalTitle}${this.state.modalChapterIndex}话`}</div>
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
                                    <div style={{ height: 40, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={this.props.is_auto_buy ? require('../../../image/collect/select_all.png') : require('../../../image/collect/unSelect_all.png')} alt='' /></div>
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

            </div >
        );
    }

    buyNow = () => {
        if (this.state.buyType === 'none') {
            ToastsStore.warning('您的C币不够啦,快去赚取金币吧!');
            return;
        }
        let globalType = this.state.mangaInfoObj.global_type;
        let tureIndex = this.state.modalTureIndex;
        Api.resourceCoins(this.state.buyType, globalType, this.state.modalId, this.state.modalSourceId, this.state.modalIndex, (e, code, message) => {
            if (message === 'success') {
                let dataReg = [...this.state.data];
                dataReg[tureIndex].is_pay = 0;
                this.setState({
                    data: dataReg
                });
                this.props.history.push(`/manga_read/${this.state.modalId}/${this.state.modalSourceId}/${this.state.modalIndex}/${globalType}`);
            }
        });
    }

    earnMoney = () => {
        this.props.history.replace('/task/');
    }

    autoBuy = () => {
        store.dispatch(auto_buy_change());
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
        let globalType = this.state.mangaInfoObj.global_type;
        this.setState({
            showModal: true,
            modalTitle: title,
            modalChapterIndex: index,

            modalId: id,
            modalSourceId: sourceId,
            modalIndex: index,
            modalTureIndex: trueIndex

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
                    this.props.history.push(`/manga_read/${id}/${sourceId}/${index}/${globalType}`);
                }
            });
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            modalChapterCoins: 0,
            modalMyCoins: '0',
            modalAllChapterCoins: 0,

            buyType: 'all'
        });
    }

    addCollect = () => {
        let { global_type, id, is_collect } = this.state.mangaInfoObj;
        if (is_collect) {
            Api.deleteCollect(global_type, [id], (e, code, message) => {
                if (message = 'success') {
                    let { mangaInfoObj } = this.state;
                    let objReg = _.assign({}, mangaInfoObj);
                    objReg.is_collect = 0;
                    this.setState({
                        mangaInfoObj: objReg
                    });
                    ToastsStore.success('取消收藏成功');
                } else {
                    ToastsStore.success('取消收藏失败');
                }
            })
        } else {
            Api.addCollect(global_type, id, (e, code, message) => {
                if (message = 'success') {
                    let { mangaInfoObj } = this.state;
                    let objReg = _.assign({}, mangaInfoObj);
                    objReg.is_collect = 1;
                    this.setState({
                        mangaInfoObj: objReg
                    });
                    ToastsStore.success('收藏成功');
                } else {
                    ToastsStore.success('收藏失败');
                }
            });
        }
    }

    readNow = () => {
        let item = this.state.data[0];
        if (item.is_pay) {
            this.openModal(item.id, item.resource_id, item.title, item.index, 0);
        } else {
            this.props.history.push(`/manga_read/${item.id}/${item.resource_id}/${item.index}/${this.props.match.params.type}`);
        }
    }

    goToMangaRead = (isPay, id, sourceId, title, index, coins, trueIndex) => {
        if (isPay) {
            this.openModal(id, sourceId, title, index, trueIndex);
            // store.dispatch(pop_show('InviteCode'));
        } else {
            this.props.history.push(`/manga_read/${id}/${sourceId}/${index}/${this.props.match.params.type}`);
        }
    }

    moreChapter = () => {
        if (!this.state.isMoreChapterState) {
            let chapterTotal = this.state.mangaInfoObj.resource_total ? this.state.mangaInfoObj.resource_total : 0;
            if (chapterTotal <= 5) {
                ToastsStore.warning('没有更多章节啦！');
                return;
            }
        }
        this.setState((preState) => {
            return {
                isMoreChapterState: !preState.isMoreChapterState
            }
        }, () => {
            if (this.state.isMoreChapterState) {
                const global_type = this.props.match.params.type;
                const mangaId = this.props.match.params.id;
                let orderKey = this.state.order ? 'asc' : 'desc';
                Api.comicResource(global_type, mangaId, orderKey, 1, 100, (e) => {
                    this.setState({
                        nowPage: e.current_page,
                        totalPage: e.last_page,
                        data: e.data
                    });
                });
            } else {
                let newData = [...this.state.data];
                newData.length = 5;
                this.setState({
                    data: newData
                });
            }
        });
    }

    normalOrder = () => {
        this.setState({
            order: true
        });
        let getCount = this.state.isMoreChapterState ? 100 : 5;
        Api.comicResource(this.props.match.params.type, this.props.match.params.id, 'asc', 1, getCount, (e) => {
            this.setState({
                nowPage: e.current_page,
                totalPage: e.last_page,
                data: e.data
            });
        });

    }

    unnormalOrder = () => {
        this.setState({
            order: false
        });
        let getCount = this.state.isMoreChapterState ? 100 : 5;
        Api.comicResource(this.props.match.params.type, this.props.match.params.id, 'desc', 1, getCount, (e) => {
            this.setState({
                nowPage: e.current_page,
                totalPage: e.last_page,
                data: e.data
            });
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

function mapState2Props(store) {
    return {
        is_auto_buy: store.read.isAutoBuy,
    }
}

const MangaDetailWithRouter = withRouter(connect(mapState2Props)(MangaDetail));
export default MangaDetailWithRouter;