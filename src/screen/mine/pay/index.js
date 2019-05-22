import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import bg_image from '../../../image/mine/pay_banner_bg.png';
import './index.js';

class SelectItem extends PureComponent {
    render() {
        return (
            <div onClick={this.btnClick} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 86, width: 161, borderRadius: 10, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgb(168,168,168)' }}>
                <div style={{ color: 'rgb(0,0,0)', fontSize: 21, fontWeight: 'bold' }}>{`20元`}</div>
                <div style={{ color: 'rgb(168,168,168)', fontSize: 15 }}>{`2500 C币`}</div>
            </div>
        );
    }

    btnClick = () => {
        if (this.props.callback) {
            this.props.callback();
        }
    }
}

class Pay extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <HeaderPro title='立即充值' rightBtnTextColor='rgb(0,0,0)' rightBtnText='充值说明' back={this.goBack} />
                <div className='bg-image-container' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 26, alignSelf: 'center', height: 104, width: CLIENT_WIDTH - 40, backgroundImage: `url(${bg_image})` }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: 24, marginLeft: 35, color: 'white', fontSize: 12 }}>我的c币</div>
                        <div style={{ marginLeft: 35, color: 'white', fontSize: 36, fontWeight: 'bold' }}>{this.props.coins}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <div style={{ marginRight: 20, borderRadius: 16, height: 33, width: 75, backgroundColor: 'rgb(255,202,0)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            C币明细
                        </div>
                    </div>
                </div>

                <div style={{ alignSelf: 'center', marginTop: 25, height: 200, width: CLIENT_WIDTH - 40, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <SelectItem />
                    <SelectItem />
                    <SelectItem />
                    <SelectItem />
                </div>

                <div style={{ marginLeft: 22, marginTop: 10, fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>选择支付方式</div>

                <div style={{ height: 22, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                </div>

            </div>
        );
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