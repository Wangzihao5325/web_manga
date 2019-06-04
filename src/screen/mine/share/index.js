import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { pop_show } from '../../../store/actions/popAction';
import Api from '../../../socket/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import { ToastsStore } from 'react-toasts';
import ClipboardJS from 'clipboard';

const BG_WIDTH = CLIENT_WIDTH > 360 ? 360 : CLIENT_WIDTH - 15;

class Progress extends PureComponent {
    render() {
        return (
            <div style={{ marginTop: 20, height: 81, width: CLIENT_WIDTH - 28, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: 30, width: CLIENT_WIDTH - 28, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ marginLeft: 40, width: 60, height: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(34,34,34)' }}>第一步</div>
                    <div style={{ width: 60, height: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(34,34,34)' }}>第二步</div>
                    <div style={{ marginRight: 40, width: 60, height: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(34,34,34)' }}>第三步</div>
                </div>
                <div style={{ height: 11, width: CLIENT_WIDTH - 28, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ marginLeft: 70, height: 8, width: 8, borderRadius: 4, backgroundColor: 'rgb(254,82,84)' }} />
                    <div style={{ width: (CLIENT_WIDTH - 28 - 140 - 24) / 2, height: 1, backgroundColor: 'rgb(254,82,84)' }} />
                    <div style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'rgb(254,82,84)' }} />
                    <div style={{ width: (CLIENT_WIDTH - 28 - 140 - 24) / 2, height: 1, backgroundColor: 'rgb(254,82,84)' }} />
                    <div style={{ marginRight: 70, height: 8, width: 8, borderRadius: 4, backgroundColor: 'rgb(254,82,84)' }} />
                </div>
                <div style={{ height: 40, width: CLIENT_WIDTH - 28, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ marginLeft: 40, width: 60, height: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(34,34,34)' }}>保存邀请码复制超链接</div>
                    <div style={{ width: 60, height: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(34,34,34)' }}>发送给好友</div>
                    <div style={{ marginRight: 40, width: 60, height: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(34,34,34)' }}>下载并注册</div>
                </div>
            </div>
        );
    }
}

class Share extends PureComponent {

    state = {
        ruleData: []
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.getInviteRule((e) => {
            this.setState({
                ruleData: e
            });
        });
    }

    render() {
        let humanNumber = [];
        let coinNum = [];
        this.state.ruleData.forEach((item, index) => {
            let humanText = `${item.begin}~${item.end}`;
            if (index === this.state.ruleData.length - 1) {
                humanText = `${item.begin}及以上`
            }
            const humanItem = <div key={index} style={{ height: 27, fontSize: 14, color: 'rgb(34,34,34)' }}>{`${humanText}`}</div>;
            const coinItem = <div key={index} style={{ height: 27, fontSize: 14, color: 'rgb(34,34,34)' }}>{`${item.coins}/人`}</div>;
            humanNumber.push(humanItem);
            coinNum.push(coinItem);
        });
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <HeaderPro title='推广分享' back={this.goBack} />
                <div style={{ flex: 1, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(231,100,54)' }}>
                    <div><img style={{ height: 175, width: BG_WIDTH }} src={require('../../../image/mine/invite_bg.png')} alt='' /></div>
                    <div style={{ height: 292, width: CLIENT_WIDTH - 28, backgroundColor: 'white', borderRadius: 10 }}>
                        <div style={{ height: 150, width: CLIENT_WIDTH - 28, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginBottom: 15, fontSize: 14, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>邀请人数</div>
                                {humanNumber}
                            </div>
                            <div style={{ width: 1, height: 150, backgroundColor: 'rgb(205,205,205)' }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginBottom: 15, fontSize: 14, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>奖励C币</div>
                                {coinNum}
                            </div>
                        </div>
                        <Progress />
                    </div>

                    <div style={{ marginTop: 18, height: 292, width: CLIENT_WIDTH - 28, backgroundColor: 'white', borderRadius: 10 }}>
                        <div style={{ marginLeft: 22, marginTop: 30, fontSize: 14, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>邀请规则:</div>
                        <p style={{ marginLeft: 22, marginRight: 22, fontSize: 14, color: 'rgb(34,34,34)' }}>1、邀请奖励为阶梯增长，邀请人数达到下一阶梯时，奖励自动升级</p>
                        <p style={{ marginLeft: 22, marginRight: 22, fontSize: 14, color: 'rgb(34,34,34)' }}>2、邀请人数无上限，邀请越多，C币奖励越多</p>
                        <p style={{ marginLeft: 22, marginRight: 22, fontSize: 14, color: 'rgb(34,34,34)' }}>3、点击右上角 “ 我的推广 ” 可查看邀请记录</p>

                    </div>
                </div>
                <div style={{ borderTopStyle: 'solid', borderTopColor: 'rgba(136,136,136,0.14)', borderTopWidth: 1, height: 110, width: CLIENT_WIDTH, position: 'fixed', left: 0, bottom: 0, backgroundColor: 'white' }}>
                    <div onClick={this.showInviteCode} style={{ marginTop: 10, width: CLIENT_WIDTH, height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ marginLeft: 15 }}>
                            <QRCode value='www.baidu.com' size={40} />
                        </div>
                        <div>
                            <div style={{ color: 'rgb(170,170,170)', fontSize: 10, marginLeft: 10 }}>我的邀请码</div>
                            <div style={{ color: 'rgb(231,100,54)', fontSize: 15, marginTop: 3, marginLeft: 10 }}>{this.props.invite_code}</div>
                        </div>
                        <div style={{ flex: 1 }} />
                        <div style={{ height: 40, width: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <img style={{ height: 16, width: 8 }} src={require('../../../image/mine/share_left_arrow.png')} alt='' />
                        </div>
                    </div>

                    <div style={{ height: 60, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <div onClick={this.saveQrCode} style={{ height: 30, width: 120, backgroundColor: 'rgb(255,42,49)', borderRadius: 15, color: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>保存二维码</div>
                        <div className='invite_link_btn' onClick={this.copyInviteLink} style={{ height: 30, width: 120, backgroundColor: 'rgb(255,42,49)', borderRadius: 15, color: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>复制邀请链接</div>
                    </div>

                </div>
            </div>
        );
    }

    saveQrCode = () => {
        ToastsStore.warning('请截屏保存二维码,完成任务请通过客户端版本！');
    }

    copyInviteLink = () => {
        new ClipboardJS('.invite_link_btn', {
            text: function (trigger) {
                return 'this is a invite link';
            }
        });
        ToastsStore.success('复制邀请链接成功，快去分享吧！');
    }

    showInviteCode = () => {
        store.dispatch(pop_show('InviteCode'));
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

function mapState2Props(store) {
    return {
        invite_code: store.user.invite_code,
        offical_url: store.appInfo.offical_url,
    }
}

const ShareWithRouter = withRouter(connect(mapState2Props)(Share));
export default ShareWithRouter;