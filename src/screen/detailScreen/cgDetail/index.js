import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import InfiniteScroll from 'react-infinite-scroller';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';
import SecurtyImage from '../../../component/securtyImage/Image';
import Modal from 'react-modal';
import './index.css';

class ImageItem extends PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', marginTop: 12 }}>
                <SecurtyImage source={this.props.source} style={{ display: 'flex', flexDirection: 'column' }} isFlexType={true} regWidth={CLIENT_WIDTH - 24} style={{}} />
            </div>
        );
    }
}

class CGDetail extends PureComponent {
    state = {
        showModal: false,
        modalChapterCoins: 0,
        modalMyCoins: 0,
        buyType: 'none',
        data: [],
        nowPage: -1,
        totalPage: -1,
        title: ''
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const cgId = parseInt(this.props.match.params.id);
        const title = this.props.match.params.title;
        Api.mangaImage('cg', cgId, 0, 0, 1, 10, (e, code, message) => {
            if (code === 200) {
                console.log(e);
                let oneCoins = Math.abs(parseInt(e.one_coins));
                let myCoins = parseInt(e.coins);
                let buyType = myCoins >= oneCoins ? 'one' : 'none';
                this.setState({
                    showModal: true,
                    modalChapterCoins: oneCoins,
                    modalMyCoins: myCoins,
                    buyType
                });
            } else if (code === 0) {
                this.setState({
                    title,
                    data: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page,
                });
            }
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title={this.state.title} back={this.goBack} />
                {this.state.data.length > 0 &&
                    <div className='scrolllist' style={{ height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <InfiniteScroll
                            pageStart={0}
                            hasMore={true}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}
                            threshold={100}
                            loadMore={this._loadMore}
                        >
                            {
                                this.state.data.map((item, index) => {
                                    return <ImageItem source={item.image_url} key={index} />
                                })
                            }
                        </InfiniteScroll>
                    </div>
                }

                <Modal
                    ariaHideApp={false}
                    className="Modal_CG"
                    overlayClassName="Overlay_CG"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal}
                    isOpen={this.state.showModal}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: 20, color: 'rgb(0,0,0)', fontSize: 14, alignSelf: 'center' }}>请进行购买操作</div>
                        {this.state.modalChapterCoins > 0 &&
                            <div style={{ alignSelf: 'center', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 44, width: CLIENT_WIDTH - 80, borderRadius: 22, borderStyle: 'solid', borderWidth: 1, borderColor: this.state.buyType === 'one' ? 'rgb(255,42,49)' : 'rgb(168,168,168)', color: this.state.buyType === 'one' ? 'rgb(255,42,49)' : 'rgb(168,168,168)' }}>
                                {`${this.state.modalChapterCoins} C币购买此话`}
                            </div>
                        }
                        {this.state.modalChapterCoins > 0 &&
                            <div style={{ alignSelf: 'center', width: CLIENT_WIDTH - 80, height: 40, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ height: 14, width: 14, borderRadius: 7, backgroundColor: 'rgb(255,42,49)', fontSize: 12, color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>C</div>
                                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginLeft: 5 }}>{`币余额:${this.state.modalMyCoins}`}</div>
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

            </div>
        );
    }

    earnMoney = () => {
        this.props.history.replace('/task/');
    }

    buyNow = () => {
       // Api.resourceCoins('all',);
    }

    closeModal = () => {
        this.setState({
            showModal: false
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        const cgId = parseInt(this.props.match.params.id);
        const newPage = this.state.nowPage + 1;
        Api.mangaImage('cg', cgId, 0, 0, newPage, 10, (e) => {
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

const CGDetailWithRouter = withRouter(CGDetail);
export default CGDetailWithRouter;