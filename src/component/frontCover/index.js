import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import SecurtyImage from '../../component/securtyImage/Image';
import './index.css';

const VER_WIDTH = (CLIENT_WIDTH - 9 * 2 - 12 * 2) / 3;
const VER_IMAGE_HEIGHT = VER_WIDTH * 1.4;
const VER_HEIGHT = VER_IMAGE_HEIGHT + 50;

const HO_WIDTH = (CLIENT_WIDTH - 2 - 12 * 2) / 2;
const HO_IMAGE_HEIGHT = HO_WIDTH / 1.5;
const HO_HEIGHT = HO_IMAGE_HEIGHT + 50;


class FrontCover extends Component {

    static defaultProps = {
        title: '',
        intro: '',
    }

    render() {
        return (
            <div className='cover_container' style={{ height: VER_HEIGHT, width: VER_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: VER_WIDTH, height: VER_IMAGE_HEIGHT }}>
                    <SecurtyImage borderRadius={5} style={{ width: VER_WIDTH, height: VER_IMAGE_HEIGHT }} source={this.props.source} />
                </div>
                <div className='text_div' style={{ color: 'rgb(34,34,34)', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>{this.props.title}</div>
                <div className='text_div' style={{ color: 'rgb(168,168,168)', fontSize: 12 }}>{this.props.intro}</div>
            </div>
        );
    }
}

class FrontCoverHo extends Component {
    static defaultProps = {
        title: '',
        intro: '',
    }

    render() {
        return (
            <div className='cover_container' style={{ height: HO_HEIGHT, width: HO_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: HO_WIDTH, height: HO_IMAGE_HEIGHT }}>
                    <SecurtyImage borderRadius={5} style={{ width: HO_WIDTH, height: HO_IMAGE_HEIGHT }} source={this.props.source} />
                </div>
                <div className='text_div' style={{ color: 'rgb(34,34,34)', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>{this.props.title}</div>
                <div className='text_div' style={{ color: 'rgb(168,168,168)', fontSize: 12 }}>{this.props.intro}</div>
            </div>
        );
    }
}

const BANNER_WIDTH = CLIENT_WIDTH - 24;
const BANNER_IMAGE_HEIGHT = BANNER_WIDTH / 2.4;
const BANNER_TOTAL_HEIGHT = BANNER_IMAGE_HEIGHT + 50;

class BannerCover extends Component {
    static defaultProps = {
        title: '',
        intro: '',
    }

    render() {
        return (
            <div className='cover_container' style={{ height: BANNER_TOTAL_HEIGHT, width: BANNER_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: BANNER_WIDTH, height: BANNER_IMAGE_HEIGHT }}>
                    <SecurtyImage borderRadius={5} style={{ width: BANNER_WIDTH, height: BANNER_IMAGE_HEIGHT }} source={this.props.source} />
                </div>
                <div className='text_div' style={{ color: 'rgb(34,34,34)', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>{this.props.title}</div>
                <div className='text_div' style={{ color: 'rgb(168,168,168)', fontSize: 12 }}>{this.props.intro}</div>
            </div>
        );
    }
}

export {
    FrontCover,
    FrontCoverHo,
    BannerCover,
    VER_WIDTH,
    VER_HEIGHT,
    HO_WIDTH,
    HO_HEIGHT,
    BANNER_WIDTH,
    BANNER_TOTAL_HEIGHT
}