import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../../store/index';
import { tab_navi_unshow } from '../../../../store/actions/tabBottomNaviAction';
import InfiniteScroll from 'react-infinite-scroller';
import { HeaderPro } from '../../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../../global/sizes';
import Api from '../../../../socket/index';
import SecurtyImage from '../../../../component/securtyImage/Image';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';

const dis_time = 5000;

class ImageItem extends PureComponent {
    render() {
        return (
            <div style={{ display: 'flex' }}>
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
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 23, width: 27 }} src={require('../../../../image/detail/manga_read_left_arrow.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>上一话</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 27, width: 27 }} src={require('../../../../image/detail/heart.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>收藏</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 27, width: 27 }} src={require('../../../../image/detail/star.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>评分</div>
                </div>
                <div onClick={this.draweShow} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 20, width: 24 }} src={require('../../../../image/detail/list.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>目录</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: 27, width: 27, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 23, width: 27 }} src={require('../../../../image/detail/manga_read_right_arrow.png')} alt='' /></div>
                    <div style={{ color: 'white' }}>下一话</div>
                </div>
            </div>
        );
    }

    draweShow = () => {
        if (this.props.drawShow) {
            this.props.drawShow();
        }
    }
}

class ChapterItem extends PureComponent {
    render() {
        let coins = Math.abs(this.props.item.coins);
        return (
            <div style={{ width: 281, height: 55, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 54, width: 250, borderBottomColor: 'rgb(50,50,50)', borderBottomWidth: 1, borderBottomStyle: 'solid' }}>
                    <div style={{ fontSize: 13, color: 'white' }}>{`${this.props.item.index}-${this.props.item.title}`}</div>
                    {
                        this.props.item.is_pay === 1 &&
                        <div style={{ alignSelf: 'center', width: 50, height: 20, marginRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgb(255,42,49)', fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><dic style={{ fontSize: 14, color: 'white' }}>C</dic></div>
                            <div style={{ color: 'rgb(255,42,49)', fontSize: 18 }}>{`${coins}`}</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

class MangaRead extends PureComponent {
    state = {
        data: [],
        chapterListData: [],
        nowPage: -1,
        totalPage: -1,
        chapterNowPage: -1,
        chapterTotalPage: -1,
        isControllerShow: true,
        isDrawerShow: false,
        title: '',
        totalChapter: 0,
        isEnd: 0,
        isEndText: '',
        order: true,
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const id = parseInt(this.props.match.params.id);
        const source = parseInt(this.props.match.params.resource);
        const type = this.props.match.params.type;
        Api.mangaImage(type, id, source, 1, 10, (e) => {
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
                isEndText: endText
            });
        });
        Api.comicResource(type, id, 'asc', 1, 1000, (e) => {
            this.setState({
                chapterNowPage: e.current_page,
                chapterTotalPage: e.last_page,
                chapterListData: e.data
            });
        });
    }

    render() {
        return (
            <div onClick={this.controllerStateChange} style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                {this.state.isControllerShow && <Header title={`第${this.props.match.params.resource}话`} back={this.goBack} rightBtnText='分享' rigthBtnClick={this.share} />}
                <div style={{ height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                                return <ImageItem source={item.image_url} key={index} />
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
                    <div style={{ position: 'fixed', top: 0, right: 0, height: 42, width: 281, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'rgb(34,34,34)' }}>
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
                    <div style={{ height: 80, width: 281 }} />
                    {
                        this.state.chapterListData.map((item, index) => {
                            return <ChapterItem key={index} item={item} index={index} />;
                        })
                    }
                </Drawer>
                {this.state.isControllerShow && <Bottom drawShow={this.drawOnShow} />}
            </div>
        );
    }

    _loadMore = () => {

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
        });
    }

    draweOnClose = () => {
        this.setState({
            isDrawerShow: false
        });
    }

    controllerStateChange = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.state.isControllerShow) {
            this.timer = setTimeout(() => {
                this.setState({
                    isControllerShow: false
                });
            }, dis_time);
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

        Api.mangaImage(type, id, source, newPage, 10, (e) => {
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