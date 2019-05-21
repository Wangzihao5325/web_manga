import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div style={{ height: 38, width: document.body.clientWidth, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
            <div style={{ height: 38, width: document.body.clientWidth, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={this.goBack} style={{ height: 38, width: 70, marginLeft: 15 }}>
                    <img style={{ height: 16, width: 8 }} src={require('../../image/usual/usual_left_arrow_2.png')} alt='' />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.props.title}</div>
                <div style={{ height: 38, width: 70, marginRight: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.rightBtnText && <div onClick={this.rigthBtnClick}>{this.props.rightBtnText}</div>}
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