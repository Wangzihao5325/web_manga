import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
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
                        <div style={{ fontSize: 21, color: 'white', marginLeft: 20, marginTop: 10, fontWeight: 'bold' }}>{this.props.item.title}</div>
                        <div style={{ marginTop: 20, marginLeft: 20, height: 20, width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ height: 20, width: 20 }}><img style={{ height: 20, width: 20 }} src={require('../../../image/main/first_fire.png')} alt='' /></div>
                            <div style={{ color: 'rgb(255,42,49)', fontSize: 16, marginLeft: 5, fontWeight: 'bold' }}>{hotNum}</div>
                        </div>
                        <div style={{ marginTop: 22, marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                            <Rate disabled defaultValue={rateScore} />
                            <div style={{ color: 'rgb(168,168,168)', fontSize: 19, fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>{score}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginTop: 13 }}>
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
                <div style={{ marginTop: 84 + 26, width: CLIENT_WIDTH - 40, alignSelf: 'center', color: 'rgb(127,127,127)', fontSize: 15 }}>{this.props.item.intro}</div>
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
            this.props.itemClick(this.props.item.is_pay, this.props.item.id, this.props.item.resource_id);
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
            return <FrontCover key={index} title={item.title} intro={item.intro} source={item.cover_url} coverClick={() => { this.props.navi.push(`/manga_detail/${item.id}/${this.props.globalType}`) }} />;
        });
        return result;
    }
}

class MangaDetail extends PureComponent {

    state = {
        mangaInfoObj: null,
        order: true,
        nowPage: -1,
        totalPage: -1,
        data: [],
        guessLikeData: []
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
        Api.guessLike(mangaId, (e) => {
            this.setState({
                guessLikeData: e.data
            })
        });
    }

    render() {
        let isEnd = false;
        let text = '连载中';
        let totalNum = 0;
        if (this.state.mangaInfoObj) {
            isEnd = this.state.mangaInfoObj.dump_status === 1 ? true : false;
            totalNum = this.state.mangaInfoObj.resource_total
        }
        if (isEnd) {
            text = '已完结';
        }

        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                {/* <HeaderPro title=' ' back={this.goBack} /> */}

                {this.state.mangaInfoObj && <MangaInfoHeader goback={this.goBack} item={this.state.mangaInfoObj} />}
                {
                    this.state.mangaInfoObj &&
                    <div style={{ marginBottom: 20, height: 20, width: CLIENT_WIDTH - 40, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                {
                    this.state.data.map((item, index) => {
                        return <ChapterCoverItem key={index} item={item} itemClick={this.goToMangaRead} />
                    })
                }
                {
                    this.state.data.length > 0 &&
                    <div onClick={this.moreChapter} style={{ height: 20, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div><img style={{ height: 14, width: 14 }} src={require('../../../image/detail/more_chapter.png')} alt='' /></div>
                        <div style={{ fontSize: 15, color: 'rgb(255,42,49)', marginLeft: 2 }}>展开目录</div>
                    </div>
                }
                {
                    this.state.guessLikeData.length > 0 &&
                    <GuessLike navi={this.props.history} data={this.state.guessLikeData} globalType={this.props.match.params.type} />
                }
                <div style={{ height: 80, width: CLIENT_WIDTH }} />
                <div style={{ backgroundColor: 'white', height: 80, width: CLIENT_WIDTH, position: 'fixed', left: 0, bottom: 0, display: 'flex', flexDirection: 'row' }}>
                    <div><img style={{ height: 80, width: 80 }} src={require('../../../image/detail/like.png')} alt='' /></div>
                    <div style={{ fontSize: 16, color: 'white', marginTop: 10, borderTopLeftRadius: 4, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: 'rgb(255,42,49)', height: 50, width: 268, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        立即阅读
                    </div>
                </div>

            </div >
        );
    }

    goToMangaRead = (isPay, id, sourceId) => {
        if (isPay) {

        } else {
            this.props.history.push(`/manga_read/${id}/${sourceId}/${this.props.match.params.type}`);
        }
    }

    moreChapter = () => {

    }

    normalOrder = () => {
        this.setState({
            order: true
        });
        Api.comicResource(this.props.match.params.type, this.props.match.params.id, 'asc', 1, 5, (e) => {
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
        Api.comicResource(this.props.match.params.type, this.props.match.params.id, 'desc', 1, 5, (e) => {
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

const MangaDetailWithRouter = withRouter(MangaDetail);
export default MangaDetailWithRouter;