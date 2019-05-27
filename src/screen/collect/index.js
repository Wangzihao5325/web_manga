import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import { FrontCover, FrontCoverHo } from '../../component/frontCover';

export default class Collect extends Component {
    render() {
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <FrontCover />
                <FrontCoverHo />
            </div>
        );
    }
}