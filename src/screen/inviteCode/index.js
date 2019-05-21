import React, { Component } from 'react';
import QRCode from 'qrcode.react';

export default class InviteCodeModel extends Component {

    render() {
        return (
            <div style={{ borderRadius: 11, height: 396, width: 290, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'rgb(34,34,34)', fontSize: 18, marginTop: 31 }}>我的邀请码</div>
                <div style={{ color: 'rgb(255,42,49)', fontSize: 23, marginTop: 20 }}>12345</div>
                <div style={{ marginTop: 26 }}>
                    <QRCode value='www.baidu.com' />
                </div>
                <div style={{ marginTop: 11, fontSize: 15, color: 'rgb(255,42,49)' }}>扫码下载工口君APP</div>
                <div style={{ marginTop: 30, height: 28, width: 178, borderRadius: 14, backgroundColor: 'rgb(234,234,234)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>官网地址:1111111</div>
                <div style={{ color: 'rgb(34,34,34)', marginTop: 15, fontSize: 11 }}>下载前请保存发布网址，可随时找到工口君</div>
            </div>
        );
    }
}
