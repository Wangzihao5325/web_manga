import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Rate } from 'antd';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import SecurtyImage from '../../component/securtyImage/Image';
import './index.css';
import indexTabImage from '../../image/main/index_tab.png';

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

const COMIC3_ITEM_WIDTH = CLIENT_WIDTH - 24;
const COMIC3_ITEM_HEIGHT = COMIC3_ITEM_WIDTH / 2;
const COMIC3_ITEM_IMAGE_HEIGHT = COMIC3_ITEM_HEIGHT - 30;
const COMIC3_ITEM_IMAGE_WIDTH = COMIC3_ITEM_IMAGE_HEIGHT / 1.5;

class Comic3Item extends Component {
    render() {
        return (
            <div style={{ width: COMIC3_ITEM_WIDTH, height: COMIC3_ITEM_HEIGHT, display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(249,249,249)', borderRadius: 4 }}>
                <div className='bg-image-container' style={{ position: 'absolute', top: 6, left: 24, height: 28, width: 25, backgroundImage: `url(${indexTabImage})`, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', marginTop: 5, fontSize: 12, fontWeight: 'bold' }}>
                    1
                </div>
                <div style={{ marginLeft: 18, alignSelf: 'center', display: 'flex' }}>
                    <SecurtyImage borderRadius={5} style={{ width: COMIC3_ITEM_IMAGE_WIDTH, height: COMIC3_ITEM_IMAGE_HEIGHT }} source={this.props.source} />
                </div>
                <div style={{ marginRight: 18, marginLeft: 21, flex: 1, height: COMIC3_ITEM_IMAGE_HEIGHT, display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                    <div className='text_div' style={{ fontSize: 15, color: 'rgb(34,34,34)', fontWeight: 'bold', marginTop: 3 }}>瑜珈人妻的濕熱呻吟</div>
                    <div style={{ height: 20, display: 'flex', flexDirection: 'row', backgroundColor: 'yellow' }}>

                    </div>
                    <div style={{ marginTop: 5, height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Rate disabled defaultValue={2} />
                        <div style={{ fontSize: 18, color: 'rgb(168,168,168)', fontWeight: 'bold' }}>10</div>
                    </div>
                    <div style={{ marginTop: 5, height: 20, display: 'flex', flexDirection: 'row', fontSize: 13, color: 'rgb(168,168,168)' }}>
                        更新至108话
                    </div>
                    <div style={{ marginTop: 5, height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div><img style={{ height: 17, width: 17 }} src={require('../../image/main/first_fire.png')} alt='' /></div>
                        <div style={{ fontSize: 16, color: 'rgb(255,42,49)', marginLeft: 6 }}>1234</div>
                    </div>
                </div>
            </div>
        );
    }

    _typeGen = () => {

    }
}

export {
    FrontCover,
    FrontCoverHo,
    BannerCover,
    Comic3Item,

    VER_WIDTH,
    VER_HEIGHT,
    HO_WIDTH,
    HO_HEIGHT,
    BANNER_WIDTH,
    BANNER_TOTAL_HEIGHT,
    COMIC3_ITEM_WIDTH,
    COMIC3_ITEM_HEIGHT,
}