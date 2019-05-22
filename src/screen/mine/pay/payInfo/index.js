import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../../store/index';
import { tab_navi_unshow } from '../../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../../component/header/index';
import { CLIENT_WIDTH } from '../../../../global/sizes';


class PayInfo extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <HeaderPro title='充值说明' back={this.goBack} />
                <div style={{ alignSelf: 'center', width: CLIENT_WIDTH - 40, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 15, color: 'rgb(0,0,0)' }}>1、C币购买后永久有效，观看漫画或动漫将消耗C币；</p>
                    <p>2、为保证交易公平，C币一经购买，不支持转让退换和提现；</p>
                    <p>3、支付购买时，请不要修改支付金额，避免支付失败；</p>
                    <p>4、做任务分享邀请好友可免费获取C币；</p>
                    <p>5、如付款后C币未到账，请及时通过问题反馈，提交问题描述并上传支付宝或微信付款明细截图，联系客服处理。</p>
                </div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/pay/');
    }
}

const ShareWithRouter = withRouter(PayInfo);
export default ShareWithRouter;