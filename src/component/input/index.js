import React, { Component } from 'react';
import './index.js'
import { CLIENT_WIDTH } from '../../global/sizes';

const SEND_TEXT = '发送';
const GET_VERCODE = '获取验证码';

class PhoneNumInput extends Component {
    render() {
        return (
            <div style={{ height: 67, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1, display: 'flex', height: 67, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 15, marginRight: 13 }}>+86</div>
                    <input className='phone-number-input' style={{ height: 14, width: CLIENT_WIDTH - 56 - 60 }} onChange={this.inputOnChange} type='text' placeholder='请输入手机号码' />
                </div>
            </div>
        );
    }

    inputOnChange = ({ target }) => {
        if (this.props.callback) {
            this.props.callback(target.value);
        }
        //console.log(target.value);
    }
}

class VerCodeInput extends Component {

    state = {
        text: SEND_TEXT,
        disable: false
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <div style={{ height: 67, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1, display: 'flex', height: 67, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <input className='phone-number-input' style={{ height: 14, width: CLIENT_WIDTH - 56 - 72, marginRight: 13 }} onChange={this.inputOnChange} type='text' placeholder='请输入验证码' />
                    <div onClick={this.sendMessage} style={{ fontSize: 12, color: 'rgb(255,42,49)', height: 31, width: 72, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgb(255,42,49)', borderRadius: 15, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        {this.state.text}
                    </div>
                </div>
            </div>
        );
    }

    sendMessage = () => {

        if (this.state.disable) {
            return;
        }

        if (this.props.send) {
            this.props.send();
        }

        let time = 59;
        this.setState((preState, props) => {
            return {
                text: time + ' s',
                disable: true
            }
        });
        this.interval = setInterval(() => {
            if (time === 0) {
                clearInterval(this.interval);
                this.setState((preState, props) => {
                    return {
                        text: SEND_TEXT,
                        disable: false
                    }
                });
                return;
            }
            time = time - 1;
            this.setState((preState, props) => {
                return {
                    text: time + ' s'
                }
            });
        }, 1000);
    }

    inputOnChange = ({ target }) => {
        if (this.props.callback) {
            this.props.callback(target.value);
        }
        //console.log(target.value);
    }
}

class LoginPhoneNumInput extends Component {
    render() {
        return (
            <div style={{ height: 43, marginTop: this.props.marginTop ? this.props.marginTop : 0, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderRadius: 21, backgroundColor: 'white', display: 'flex', height: 43, width: 270, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <input className='phone-number-input' style={{ height: 14, width: 250 }} onChange={this.inputOnChange} type='text' placeholder='请输入手机号码' />
                </div>
            </div>
        );
    }

    inputOnChange = ({ target }) => {
        if (this.props.callback) {
            this.props.callback(target.value);
        }
        //console.log(target.value);
    }
}

class LoginVerCodeInput extends Component {
    state = {
        text: GET_VERCODE,
        disable: false
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <div style={{ marginTop: this.props.marginTop ? this.props.marginTop : 0, height: 43, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', borderRadius: 21, display: 'flex', height: 43, width: 270, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <input className='phone-number-input' style={{ height: 14, width: 160, marginRight: 13 }} onChange={this.inputOnChange} type='text' placeholder='请输入验证码' />
                    <div style={{ height: 25, width: 1, backgroundColor: 'rgb(182,182,182)' }} />
                    <div onClick={this.sendMessage} style={{ fontSize: 12, color: 'rgb(255,42,49)', height: 31, width: 72, borderRadius: 15, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        {this.state.text}
                    </div>
                </div>
            </div>
        );
    }

    sendMessage = () => {

        if (this.state.disable) {
            return;
        }

        if (this.props.send) {
            this.props.send();
        }

        let time = 59;
        this.setState((preState, props) => {
            return {
                text: time + ' s',
                disable: true
            }
        });
        this.interval = setInterval(() => {
            if (time === 0) {
                clearInterval(this.interval);
                this.setState((preState, props) => {
                    return {
                        text: GET_VERCODE,
                        disable: false
                    }
                });
                return;
            }
            time = time - 1;
            this.setState((preState, props) => {
                return {
                    text: time + ' s'
                }
            });
        }, 1000);
    }

    inputOnChange = ({ target }) => {
        if (this.props.callback) {
            this.props.callback(target.value);
        }
        //console.log(target.value);
    }
}

class LoginPasswordInput extends Component {
    render() {
        return (
            <div style={{ height: 43, marginTop: this.props.marginTop ? this.props.marginTop : 0, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderRadius: 21, backgroundColor: 'white', display: 'flex', height: 43, width: 270, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <input className='phone-number-input' style={{ height: 14, width: 250 }} onChange={this.inputOnChange} type='text' placeholder='请输入密码' />
                </div>
            </div>
        );
    }

    inputOnChange = ({ target }) => {
        if (this.props.callback) {
            this.props.callback(target.value);
        }
        //console.log(target.value);
    }
}

export {
    PhoneNumInput,
    VerCodeInput,
    LoginPhoneNumInput,
    LoginVerCodeInput,
    LoginPasswordInput
}