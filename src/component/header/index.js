import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div style={{ height: 38, width: document.body.clientWidth, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={this.props.back} style={{ height: 16, width: 8, marginLeft: 15 }}>
                    <img style={{ height: 16, width: 8 }} src={require('../../image/usual/usual_left_arrow_2.png')} />
                </div>
            </div>
        );
    }
}