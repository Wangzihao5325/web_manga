import React, { Component } from 'react';
import Api from '../../socket/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import bg_image from '../../image/task/task_bg.jpg';
import header_bg_image from '../../image/task/task_header_bg.png';
import page_bg from '../../image/task/page_bg.png';
import './index.css';

class StateBtn extends Component {

    render() {
        let containerStyle = { borderRadius: 14, height: 28, width: 69, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' };
        let text = '做任务';
        switch (this.props.state) {
            case 0:
                containerStyle = { ...containerStyle, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgb(255,42,49)', color: 'rgb(255,42,49)' };
                text = '做任务';
                break;
            case 1:
                containerStyle = { ...containerStyle, backgroundColor: 'rgb(255,42,49)', color: 'white' };
                text = '领取';
                break;
            case 2:
                containerStyle = { ...containerStyle, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgb(168,168,168)', color: 'rgb(168,168,168)' };
                text = '已完成';
                break;
        }
        return (
            <div style={containerStyle}>
                {`${text}`}
            </div>
        );
    }
}

class LinkBar extends Component {
    render() {
        return (
            <div style={{ zIndex: 10, marginTop: -12, alignSelf: 'center', height: 40, width: 270, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <img key={0} style={{ height: 40, width: 10 }} src={require('../../image/task/link.png')} alt='' />
                <img key={1} style={{ height: 40, width: 10 }} src={require('../../image/task/link.png')} alt='' />
            </div>
        );
    }
}

class TaskItem extends Component {
    render() {
        let imgPath = require('../../image/task/task_new_register.png');
        switch (this.props.item.key) {
            case 'REGISTER':
                imgPath = require('../../image/task/task_new_register.png');
                break;
            case 'SAVE_PHOTO':
                imgPath = require('../../image/task/save_photo.png');
                break;
            case 'SAVE_CARD':
                imgPath = require('../../image/task/save_card.png');
                break;
            case 'BIND_MOBILE':
                imgPath = require('../../image/task/bind_mobile.png');
                break;
            case 'CLICK_AD':
                imgPath = require('../../image/task/click_ad.png');
                break;
            case 'SHARE_COMIC':
                imgPath = require('../../image/task/share_comic.png');
                break;
            case 'COLLECT_COMIC':
                imgPath = require('../../image/task/collect_comic.png');
                break;
            case 'LOOK_THIRTY':
                imgPath = require('../../image/task/look_tirthy.png');
                break;
            case 'READ_TEN':
                imgPath = require('../../image/task/read_ten.png');
                break;
            case 'READ_TWENTY_MORE':
                imgPath = require('../../image/task/read_twenty.png');
                break;
            case 'READ_THIRTY_MORE':
                imgPath = require('../../image/task/read_ten.png');
                break;
            case 'READ_SIXTY_MORE':
                imgPath = require('../../image/task/read_hour.png');
                break;
        }
        return (
            <div style={{ borderTopStyle: 'solid', borderTopColor: 'rgb(244,244,244)', borderTopWidth: 1, alignSelf: 'center', width: 320 - 36, height: 65, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div><img style={{ height: 19, width: 19 }} src={imgPath} alt='' /></div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                    <div style={{ color: 'rgb(0,34,34)', fontSize: 13, fontWeight: 400 }}>{`${this.props.item.title}`}</div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                        <div style={{ height: 14, width: 14, borderRadius: 7, backgroundColor: 'rgb(255,42,49)', fontSize: 12, color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>C</div>
                        <div style={{ marginLeft: 5, color: 'rgb(168,168,168)', fontSize: 12 }}>{`+${this.props.item.coins} C币奖励`}</div>
                    </div>
                </div>
                <div style={{ flex: 1 }} />
                <StateBtn state={this.props.item.sign} />
            </div>
        );
    }
}

export default class Task extends Component {

    state = {
        newData: [],
        dailyData: []
    };

    componentDidMount() {
        Api.taskList((e) => {
            let newReg = [];
            let dailyReg = [];
            e.forEach((item, index) => {
                if (item.group === 'new') {
                    const newItem = <TaskItem key={index} item={item} />
                    newReg.push(newItem);
                }
                if (item.group === 'daily') {
                    const dailyItem = <TaskItem key={index} item={item} />
                    dailyReg.push(dailyItem);
                }
            });
            this.setState({
                newData: newReg,
                dailyData: dailyReg
            });
        });
    }

    render() {

        return (
            <div className='image-bg-container' style={{ height: 1420, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg_image})` }}>
                <div className='image-bg-container' style={{ height: 204, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', backgroundImage: `url(${header_bg_image})` }}>
                    <div style={{ marginTop: 50, marginLeft: 36, color: 'rgb(232,232,232)' }}>已拥有C币</div>
                    <div style={{ fontSize: 38, marginTop: 7, color: 'white', marginLeft: 35, fontWeight: 'bold' }}>2648</div>
                    <div style={{ marginLeft: 35, marginTop: 22, height: 32, width: 94, display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(212,81,52)', color: 'rgb(255,210,142)', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>立即充值</div>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    <img style={{ height: 33, width: 351, marginLeft: 1 }} src={require('../../image/task/task_page_top.png')} alt='' />
                </div>
                <div className='image-bg-container' style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -20, height: 163, width: 320, alignSelf: 'center', display: 'flex', flexDirection: 'column', backgroundImage: `url(${page_bg})` }} >
                    红包
                </div>
                <LinkBar />
                <div style={{ marginTop: -12, borderRadius: 10, alignSelf: 'center', height: 332, width: 320, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                    <div style={{ fontSize: 16, color: 'rgb(34,34,34)', marginTop: 25, marginLeft: 26, fontWeight: 'bold', marginBottom: 15 }}>新手奖励</div>
                    {this.state.newData}
                </div>
                <LinkBar />
                <div style={{ marginTop: -12, borderRadius: 10, alignSelf: 'center', height: 593, width: 320, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                    <div style={{ fontSize: 16, color: 'rgb(34,34,34)', marginTop: 25, marginLeft: 26, fontWeight: 'bold', marginBottom: 15 }}>日常奖励</div>
                    {this.state.dailyData}
                </div>
            </div>
        );
    }
}