import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import './index.css';

const KEY = 'wPK8CxWaOwPuVzgs';

export default class SecurtyImage extends Component {

    static defaultProps = {
        isFlexType: false
    }

    state = {
        trueSource: null,
        lastSource: null,

        flexStyle: {}
    }

    componentDidMount() {
        this._getTrueSource();
    }

    componentDidUpdate() {
        this._getTrueSource();
    }

    render() {
        let height = this.props.style.height ? this.props.style.height : 0;
        let width = this.props.style.width ? this.props.style.width : 0;
        let borderRadius = this.props.borderRadius ? this.props.borderRadius : 0;
        return (
            <div style={this.props.style}>
                {!this.props.isFlexType && <img className='image-container' style={{ height: height, width: width, borderRadius: borderRadius }} src={this.state.source} alt='' />}
                {this.props.isFlexType && <img ref={ref => { this.imageRef = ref }} onLoad={this._imageOnload} className='image-container' style={this.state.flexStyle} src={this.state.source} alt='' />}
            </div>
        );
    }

    _imageOnload = () => {
        const { clientWidth, clientHeight } = this.imageRef;
        if (this.props.regWidth) {
            const regHeight = (clientHeight / clientWidth) * this.props.regWidth;
            this.setState({
                flexStyle: { height: regHeight, width: this.props.regWidth, borderRadius: this.props.borderRadius ? this.props.borderRadius : 0 }
            });
        }
    }

    _getTrueSource = () => {
        let uri = this.props.source;
        if (uri && uri !== this.state.lastSource) {
            let regArr = uri.split('.');
            let typeStr = regArr[regArr.length - 1];
            if (typeStr === 'ceb') {
                //ceb图片
                let xhr = new XMLHttpRequest();
                xhr.open("GET", uri, true);
                xhr.responseType = "arraybuffer";
                xhr.timeout = 3000;
                xhr.onload = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            let trueData = this._decrypt(xhr.response);
                            let base64Data = trueData.toString(CryptoJS.enc.Base64);
                            this.setState({
                                source: `data:image/png;base64,${base64Data}`
                            });
                        }
                    }
                }
                xhr.send();
                this.setState({ lastSource: uri });
            } else {
                this.setState({ source: this.props.source, lastSource: uri });
            }
        }
    }

    _decrypt = (data) => {
        let u8array = new Uint8Array(data);
        let reg = this._u8ArrayParse(u8array);
        reg = reg.toString(CryptoJS.enc.Base64);
        var decrypted = CryptoJS.AES.decrypt(reg, CryptoJS.enc.Latin1.parse(KEY), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted;
    }

    _u8ArrayParse = (u8arr) => {
        var len = u8arr.length;
        var words = [];
        for (var i = 0; i < len; i++) {
            words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
        }
        return CryptoJS.lib.WordArray.create(words, len);
    }
}