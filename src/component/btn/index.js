import React, { Component } from 'react';
import { CLIENT_WIDTH } from '../../global/sizes';

class NormalBtn extends Component {
    render() {
        return (
            <div onClick={this._onClick} style={{ marginLeft: 32, alignSelf: 'center', color: 'white', marginTop: this.props.marginTop ? this.props.marginTop : 0, height: 46, width: CLIENT_WIDTH - 64, borderRadius: 23, backgroundColor: 'rgb(255,42,49)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.title}
            </div>
        );
    }

    _onClick = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }
}

class LoginBtn extends Component {
    render() {
        return (
            <div onClick={this._onClick} style={{ alignSelf: 'center', color: 'white', marginTop: this.props.marginTop ? this.props.marginTop : 0, height: 46, width: 270, borderRadius: 23, backgroundColor: 'rgb(255,42,49)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.title}
            </div>
        );
    }

    _onClick = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }
}

export {
    NormalBtn,
    LoginBtn
}