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

class MangaRead extends PureComponent {
    state = {
        data: [],
        nowPage: -1,
        totalPage: -1,
        title: '',
        isControllerShow: true,
        isDrawerShow: false
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
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.draweOnClose}
                    visible={this.state.isDrawerShow}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                {this.state.isControllerShow && <Bottom drawShow={this.drawOnShow} />}
            </div>
        );
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