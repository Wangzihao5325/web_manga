import React, { Component } from 'react';
import './index.js'

class PhoneNumInput extends Component {
    render() {
        return (
            <div style={{ height: 67, width: document.body.clientWidth, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1, display: 'flex', height: 67, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 15, marginRight: 13 }}>+86</div>
                    <input className='phone-number-input' style={{ height: 14, width: document.body.clientWidth - 56 - 60 }} onChange={this.inputOnChange} type='text' placeholder='请输入手机号码' />
                </div>
            </div>
        );
    }

    inputOnChange = ({ target }) => {
        console.log(target.value);
    }
}

class VerCodeInput extends Component {

    state = {
        text: '发送'
    }

    render() {
        return (
            <div style={{ height: 67, width: document.body.clientWidth, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1, display: 'flex', height: 67, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <input className='phone-number-input' style={{ height: 14, width: document.body.clientWidth - 56 - 72 }} onChange={this.inputOnChange} type='text' placeholder='请输入手机号码' />
                    <div style={{ fontSize: 12, color: 'rgb(255,42,49)', height: 31, width: 72, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgb(255,42,49)', borderRadius: 15, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        {this.state.text}
                    </div>
                </div>
            </div>
        );
    }

    inputOnChange = ({ target }) => {
        console.log(target.value);
    }
}

export {
    PhoneNumInput,
    VerCodeInput
}