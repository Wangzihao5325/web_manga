import React, { Component } from 'react';
import { CLIENT_WIDTH } from '../../global/sizes';

class Header extends Component {
    render() {
        return (
            <div style={{ height: 38, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={this.props.back} style={{ height: 16, width: 8, marginLeft: 15 }}>
                    <img style={{ height: 16, width: 8 }} src={require('../../image/usual/usual_left_arrow_2.png')} alt='' />
                </div>
            </div>
        );
    }
}

class HeaderPro extends Component {
    render() {
        return (
            <div style={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'rgb(244,244,244)', height: 38, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={this.goBack} style={{ height: 38, width: 70, marginLeft: 15, display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: 16, width: 8 }} src={require('../../image/usual/usual_left_arrow_2.png')} alt='' />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, color: 'rgb(34,34,34)' }}>{this.props.title}</div>
                <div style={{ height: 38, width: 70, marginRight: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.rightBtnText && <div style={{ color: 'rgb(255,42,49)', fontSize: 16 }} onClick={this.rigthBtnClick}>{this.props.rightBtnText}</div>}
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

export {
    Header,
    HeaderPro
}