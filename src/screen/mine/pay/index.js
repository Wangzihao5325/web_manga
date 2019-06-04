import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH } from '../../../global/sizes';
import bg_image from '../../../image/mine/pay_banner_bg.png';
import './index.js';
import Api from '../../../socket/index';
import { ToastsStore } from 'react-toasts';


const Item_Width = (CLIENT_WIDTH - 60) / 2;

class SelectItem extends PureComponent {
    render() {
        return (
            <div onClick={this.btnClick} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 86, width: Item_Width, borderRadius: 10, borderStyle: 'solid', borderWidth: 1, borderColor: this.props.selectId === this.props.id ? 'rgb(255,42,49)' : 'rgb(168,168,168)' }}>
                <div style={{ color: this.props.selectId === this.props.id ? 'rgb(255,42,49)' : 'rgb(0,0,0)', fontSize: 21, fontWeight: 'bold' }}>{`${this.props.price}元`}</div>
                <div style={{ color: this.props.selectId === this.props.id ? 'rgb(255,42,49)' : 'rgb(168,168,168)', fontSize: 15 }}>{`${this.props.coins} C币`}</div>
            </div>
        );
    }

    btnClick = () => {
        if (this.props.callback) {
            this.props.callback(this.props.id, this.props.price);
        }
    }
}

class Pay extends PureComponent {

    state = {
        rechargeList: [],
        selectId: -1,
        selectPrice: '0.00',
        aliPay: 0,
        weChat: 0,
        selectPay: 'none'
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.rechargeList((e) => {
            this.setState({
                rechargeList: e
            });
        });
        Api.payList((e) => {
            let ali = 0;
            let wechat = 0;
            e.every((item) => {
                switch (item.key) {
                    case 'alipay':
                        ali = item.status
                        break;
                    case 'wechatpay':
                        wechat = item.status
                        break;
                }
                return true;
            });
            this.setState({
                aliPay: ali,
                weChat: wechat
            });
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <HeaderPro title='立即充值' rightBtnTextColor='rgb(0,0,0)' rightBtnText='充值说明' back={this.goBack} rightBtnClick={this.goToPayInfo} />
                <div className='bg-image-container' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 26, alignSelf: 'center', height: 104, width: CLIENT_WIDTH - 40, backgroundImage: `url(${bg_image})` }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: 24, marginLeft: 35, color: 'white', fontSize: 12 }}>我的c币</div>
                        <div style={{ marginLeft: 35, color: 'white', fontSize: 36, fontWeight: 'bold' }}>{this.props.coins}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <div onClick={this.goToCCoinList} style={{ marginRight: 20, borderRadius: 16, height: 33, width: 75, backgroundColor: 'rgb(255,202,0)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            C币明细
                        </div>
                    </div>
                </div>

                <div style={{ alignSelf: 'center', marginTop: 25, height: 200, width: CLIENT_WIDTH - 40, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.state.rechargeList.map((item, index) => {
                        return <SelectItem callback={this.itemCallback} selectId={this.state.selectId} key={index} coins={item.coins} price={item.price} id={item.id} />
                    })}
                </div>

                <div style={{ marginLeft: 22, marginTop: 10, fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>选择支付方式</div>

                <div onClick={this.selectAli} style={{ marginTop: 24, height: 22, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img style={{ height: 22, width: 22, marginLeft: 21 }} src={require('../../../image/mine/aliPay.png')} alt='' />
                    <div style={{ marginLeft: 10, color: 'rgb(34,34,34)', fontSize: 16, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>支付宝支付</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ marginRight: 27 }}><img style={{ height: 19, width: 19 }} src={this.state.selectPay === 'ali' ? require('../../../image/mine/pay_select.png') : require('../../../image/mine/pay_unselect.png')} alt='' /></div>
                </div>

                <div onClick={this.selectWechat} style={{ marginTop: 22, height: 22, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img style={{ height: 22, width: 22, marginLeft: 21 }} src={require('../../../image/mine/weChat.png')} alt='' />
                    <div style={{ marginLeft: 10, color: 'rgb(34,34,34)', fontSize: 16, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>微信支付</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ marginRight: 27 }}><img style={{ height: 19, width: 19 }} src={this.state.selectPay === 'wechat' ? require('../../../image/mine/pay_select.png') : require('../../../image/mine/pay_unselect.png')} alt='' /></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopStyle: 'solid', borderTopWidth: 1, borderTopColor: 'rgba(154,154,154,0.11)', height: 72, width: CLIENT_WIDTH, position: 'absolute', bottom: 0, left: 0 }}>
                    <div style={{ marginLeft: 40, fontSize: 18, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>{`共计 ¥${this.state.selectPrice}`}</div>
                    <div onClick={this.payNow} style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20, height: 44, width: 178, borderRadius: 22, backgroundColor: 'rgb(255,42,29)' }}>
                        立即充值
                    </div>
                </div>

            </div>
        );
    }

    payNow = () => {
        if (this.state.selectId === -1) {
            ToastsStore.warning('请选择充值金额');
        }
        if (this.state.selectPay === 'none') {
            ToastsStore.warning('请选择支付通道');
        }
        //add order
    }

    selectAli = () => {
        if (this.state.aliPay) {
            this.setState({
                selectPay: 'ali'
            });
        } else {
            ToastsStore.warning('该支付通道暂时关闭，请切换支付通道');
        }
    }

    selectWechat = () => {
        if (this.state.weChat) {
            this.setState({
                selectPay: 'wechat'
            });
        } else {
            ToastsStore.warning('该支付通道暂时关闭，请切换支付通道');
        }
    }

    itemCallback = (id, price) => {
        this.setState({
            selectId: id,
            selectPrice: price
        })
    }

    goToCCoinList = () => {
        this.props.history.push('/coin_list/');
    }

    goToPayInfo = () => {
        this.props.history.push('/pay_info/');
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

function mapState2Props(store) {
    return {
        coins: store.user.coins,
    }
}

const PayWithRouter = withRouter(connect(mapState2Props)(Pay));;
export default PayWithRouter;