import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

class InviteCodeModel extends Component {

    render() {
        let officalUrl = this.props.offical_url.split('//')[1];
        return (
            <div style={{ borderRadius: 11, height: 396, width: 290, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'rgb(34,34,34)', fontSize: 18, marginTop: 31 }}>我的邀请码</div>
                <div style={{ color: 'rgb(255,42,49)', fontSize: 23, marginTop: 20 }}>{this.props.invite_code}</div>
                <div style={{ marginTop: 26 }}>
                    <QRCode value='www.baidu.com' />
                </div>
                <div style={{ marginTop: 11, fontSize: 15, color: 'rgb(255,42,49)' }}>扫码下载工口君APP</div>
                <div style={{ marginTop: 20, height: 28, width: 178, borderRadius: 14, backgroundColor: 'rgb(234,234,234)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{`官网地址:${officalUrl}`}</div>
                <div style={{ color: 'rgb(34,34,34)', marginTop: 15, fontSize: 11 }}>下载前请保存发布网址，可随时找到工口君</div>
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        invite_code: store.user.invite_code,
        offical_url: store.appInfo.offical_url,
        share_url: store.appInfo.share_url
    }
}

const InviteCodeModelWithStore = connect(mapState2Props)(InviteCodeModel);
export default InviteCodeModelWithStore;