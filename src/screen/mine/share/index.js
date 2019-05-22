import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';

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

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <HeaderPro title='推广分享' back={this.goBack} />
                <div style={{ height: CLIENT_HEIGHT - 40, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(231,100,54)' }}>
                    <div><img style={{ height: 175, width: 360 }} src={require('../../../image/mine/invite_bg.png')} alt='' /></div>
                    <div style={{ height: 292, width: CLIENT_WIDTH - 28, backgroundColor: 'white', borderRadius: 10 }}>
                        <div style={{ height: 150, width: CLIENT_WIDTH - 28, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1 }}></div>
                            <div style={{ width: 1, height: 150, backgroundColor: 'rgb(205,205,205)' }} />
                            <div style={{ flex: 1 }}></div>
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
                <div style={{ height: 110, width: CLIENT_WIDTH, position: 'absolute', left: 0, bottom: 0, backgroundColor: 'white' }}>

                    
                </div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

const ShareWithRouter = withRouter(Share);
export default ShareWithRouter;