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
            <div onClick={this.coverClick} className='cover_container' style={{ height: VER_HEIGHT, width: VER_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: VER_WIDTH, height: VER_IMAGE_HEIGHT }}>
                    <SecurtyImage borderRadius={5} style={{ width: VER_WIDTH, height: VER_IMAGE_HEIGHT }} source={this.props.source} />
                </div>
                <div className='text_div' style={{ color: 'rgb(34,34,34)', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>{this.props.title}</div>
                <div className='text_div' style={{ color: 'rgb(168,168,168)', fontSize: 12 }}>{this.props.intro}</div>
            </div>
        );
    }

    coverClick = () => {
        if (this.props.coverClick) {
            this.props.coverClick();
        }
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
            <div onClick={this.coverClick} className='cover_container' style={{ height: BANNER_TOTAL_HEIGHT, width: BANNER_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: BANNER_WIDTH, height: BANNER_IMAGE_HEIGHT }}>
                    <SecurtyImage borderRadius={5} style={{ width: BANNER_WIDTH, height: BANNER_IMAGE_HEIGHT }} source={this.props.source} />
                </div>
                <div className='text_div' style={{ color: 'rgb(34,34,34)', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>{this.props.title}</div>
                <div className='text_div' style={{ color: 'rgb(168,168,168)', fontSize: 12 }}>{this.props.intro}</div>
            </div>
        );
    }

    coverClick = () => {
        if (this.props.coverClick) {
            this.props.coverClick();
        }
    }
}

const COMIC3_ITEM_WIDTH = CLIENT_WIDTH - 24;
const COMIC3_ITEM_HEIGHT = COMIC3_ITEM_WIDTH / 2;
const COMIC3_ITEM_IMAGE_HEIGHT = COMIC3_ITEM_HEIGHT - 30;
const COMIC3_ITEM_IMAGE_WIDTH = COMIC3_ITEM_IMAGE_HEIGHT / 1.5;

class Comic3Item extends Component {


    state = {
        tabs: []
    }

    componentDidMount() {
        let tabDataArr = [];
        if (this.props.item.is_new) {
            tabDataArr.push({ title: '新作', color: 'rgb(255,163,163)' });
        }
        if (this.props.item.is_recommend) {
            tabDataArr.push({ title: '推荐', color: 'rgb(158,244,255)' });
        }
        if (this.props.item.is_pay) {
            tabDataArr.push({ title: '免费', color: 'rgb(255,196,174)' });
        }
        if (this.props.item.dump_status) {
            tabDataArr.push({ title: '完结', color: 'rgb(218,174,255)' });
        }
        this.setState({
            tabs: tabDataArr
        });
    }

    render() {
        let hotImage = require('../../image/main/first_fire.png');
        switch (this.props.index) {
            case 0:
                hotImage = require('../../image/main/first_fire.png');
                break;
            case 1:
                hotImage = require('../../image/main/second_fire.png');
                break;
            case 2:
                hotImage = require('../../image/main/third_fire.png');
                break;
            default:
                hotImage = require('../../image/main/third_fire.png');
                break;
        }
        let rateScroll = parseInt(((this.props.item.score.toFixed(0)) / 2).toFixed(0));
        return (
            <div onClick={this.coverClick} style={{ marginTop: 10, width: COMIC3_ITEM_WIDTH, height: COMIC3_ITEM_HEIGHT, display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(249,249,249)', borderRadius: 4 }}>
                <div className='bg-image-container' style={{ position: 'relative', top: 6, left: 30, height: 28, width: 25, backgroundImage: `url(${indexTabImage})`, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', marginTop: 5, fontSize: 12, fontWeight: 'bold' }}>
                    {this.props.index + 1}
                </div>
                <div style={{ marginTop: 15, marginBottom: 15, alignSelf: 'center', display: 'flex' }}>
                    <SecurtyImage borderRadius={5} style={{ width: COMIC3_ITEM_IMAGE_WIDTH, height: COMIC3_ITEM_IMAGE_HEIGHT }} source={this.props.item.cover_url} />
                </div>
                <div style={{ marginRight: 18, marginLeft: 21, flex: 1, height: COMIC3_ITEM_IMAGE_HEIGHT, display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                    <div className='text_div' style={{ fontSize: 15, color: 'rgb(34,34,34)', fontWeight: 'bold', marginTop: 3 }}>{this.props.item.title}</div>
                    <div style={{ height: 20, marginTop: 13, display: 'flex', flexDirection: 'row' }}>
                        {this.state.tabs.map((item, index) => {
                            return <div key={index} style={{ borderRadius: 3, marginRight: 4, height: 18, width: 35, backgroundColor: item.color, color: 'white', fontSize: 11, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>{item.title}</div>
                        })}
                    </div>
                    <div style={{ marginTop: 5, height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Rate disabled defaultValue={rateScroll} />
                        <div style={{ fontSize: 18, color: 'rgb(168,168,168)', fontWeight: 'bold' }}>{`${this.props.item.score}`}</div>
                    </div>
                    <div style={{ marginTop: 5, height: 20, display: 'flex', flexDirection: 'row', fontSize: 13, color: 'rgb(168,168,168)' }}>
                        {`更新至${this.props.item.resource_total}话`}
                    </div>
                    <div style={{ marginTop: 5, height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div><img style={{ height: 17, width: 17 }} src={hotImage} alt='' /></div>
                        <div style={{ fontSize: 16, color: 'rgb(255,42,49)', marginLeft: 6, fontWeight: 'bold' }}>{this.props.item.hot}</div>
                    </div>
                </div>
            </div>
        );
    }

    coverClick = () => {
        if (this.props.coverClick) {
            this.props.coverClick();
        }
    }

    _typeGen = () => {

    }
}

const COMIC4_ITEM_WIDTH = (CLIENT_WIDTH - 12 - 30 - 30) / 3;
const COMIC4_IMAGE_HEIGHT = COMIC4_ITEM_WIDTH * 1.4;
const COMIC4_TOTAL_HEIGHT = COMIC4_IMAGE_HEIGHT + 50;

class Comic4Item extends Component {

    static defaultProps = {
        title: '',
        intro: '',
    }

    render() {
        return (
            <div onClick={this.coverClick} className='cover_container' style={{ height: COMIC4_TOTAL_HEIGHT, width: COMIC4_ITEM_WIDTH + 4, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', position: 'relative' }}>
                <div className='bg-image-container' style={{ position: 'absolute', top: 0, left: 5, height: 28, width: 25, backgroundImage: `url(${indexTabImage})`, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                    {this.props.index + 1}
                </div>
                <div style={{ width: COMIC4_ITEM_WIDTH, height: COMIC4_IMAGE_HEIGHT, display: 'flex', flexDirection: 'column', marginTop: 4 }}>
                    <SecurtyImage borderRadius={5} style={{ width: COMIC4_ITEM_WIDTH, height: COMIC4_IMAGE_HEIGHT }} source={this.props.item.cover_url} />
                </div>
                <div className='text_div' style={{ height: 30, width: COMIC4_ITEM_WIDTH, color: 'rgb(34,34,34)', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>{this.props.item.title}</div>
                <div className='text_div' style={{ height: 30, width: COMIC4_ITEM_WIDTH, color: 'rgb(168,168,168)', fontSize: 12 }}>{this.props.item.intro}</div>
            </div>
        );
    }

    coverClick = () => {
        if (this.props.coverClick) {
            this.props.coverClick();
        }
    }
}

export {
    FrontCover,
    FrontCoverHo,
    BannerCover,
    Comic3Item,
    Comic4Item,

    VER_WIDTH,
    VER_HEIGHT,
    HO_WIDTH,
    HO_HEIGHT,
    BANNER_WIDTH,
    BANNER_TOTAL_HEIGHT,
    COMIC3_ITEM_WIDTH,
    COMIC3_ITEM_HEIGHT,
    COMIC4_ITEM_WIDTH,
    COMIC4_TOTAL_HEIGHT
}