import React, { Component } from "react";
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';

export default class LinkFooter extends Component {
    render() {
        return (
            <div style={{ justifyContent: 'space-between', alignItems: 'center', height: 40, width: CLIENT_WIDTH, position: 'fixed', left: 0, bottom: 69, display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                <div style={{ color: 'rgb(34,34,34)', marginLeft: 12 }}>下载App获得更佳体验 !</div>
                <div onClick={this.lost} style={{ marginRight: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30, width: 100, borderRadius: 20, color: 'white', backgroundColor: 'rgb(255,42,49)' }}>立即下载</div>
            </div>
        );
    }

    lost = () => {
        window.open(this.props.url);
    }
}