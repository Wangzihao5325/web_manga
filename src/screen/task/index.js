import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Api from '../../socket/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import bg_image from '../../image/task/task_bg.jpg';
import header_bg_image from '../../image/task/task_header_bg.png';
import page_bg from '../../image/task/page_bg.png';
import done_open from '../../image/task/done_open.png';
import { ToastsStore } from 'react-toasts';
import store from '../../store/index';
import { get_user_info } from '../../store/actions/userAction';
import { tab_navi_show, tab_navi_select_change } from '../../store/actions/tabBottomNaviAction';
import './index.css';

class StateBtn extends Component {

    render() {
        let containerStyle = { fontSize: 12, borderRadius: 14, height: 28, width: 69, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' };
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
            default:
                break;
        }
        return (
            <div onClick={this.btnClick} style={containerStyle}>
                {`${text}`}
            </div>
        );
    }

    btnClick = () => {
        if (this.props.btnClick) {
            this.props.btnClick(this.props.state);
        }
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
            case 'LOOK_ONE':
                imgPath = require('../../image/task/look_tirthy.png');
                break;
            case 'READ_ONE':
                imgPath = require('../../image/task/read_ten.png');
                break;
            case 'READ_THREE':
                imgPath = require('../../image/task/read_twenty.png');
                break;
            case 'READ_FIVE':
                imgPath = require('../../image/task/read_hour.png');
                break;
            // case 'READ_SIXTY_MORE':
            //     imgPath = require('../../image/task/read_hour.png');
            //     break;
            default:
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
                <StateBtn btnClick={this.clickCallback} state={this.props.item.sign} />
            </div>
        );
    }

    clickCallback = (state) => {
        if (this.props.clickCallback) {
            this.props.clickCallback(this.props.item.key, state);
        }
    }
}

class MoneyItemDone extends Component {
    render() {
        return (
            <div className='image-bg-container' style={{ height: 70, width: 48, backgroundImage: `url(${done_open})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ marginBottom: 15, fontSize: 17, color: 'white' }}>
                    {this.props.coins}
                </div>
            </div>
        );
    }
}

class MoneyItemWillOPen extends Component {
    render() {
        return (
            <div onClick={this.open} style={{ height: 70, width: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                <img style={{ width: 47, height: 61 }} src={require('../../image/task/will_open.png')} alt='' />
            </div>
        );
    }

    open = () => {
        if (this.props.open) {
            this.props.open();
        }
    }
}

class MoneyItemWillShow extends Component {
    render() {
        return (
            <div style={{ height: 70, width: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                <img style={{ width: 47, height: 61 }} src={require('../../image/task/will_show.png')} alt='' />
            </div>
        );
    }
}

class Task extends Component {

    state = {
        newData: [],
        dailyData: [],
        coinData: [],
        day: 0
    };

    componentDidMount() {
        store.dispatch(tab_navi_show());
        store.dispatch(tab_navi_select_change(2));
        Api.signList((e) => {
            let block = e.block;
            let coins = e.coins.reverse();
            let stateArr = [];
            let dataReg = [];
            coins.forEach((item) => {
                stateArr.push(item.value);
            });
            for (let i = 0; i < block; i++) {
                if (i === 0) {
                    stateArr.push(-20);
                } else {
                    stateArr.push(-10);
                }
            }

            stateArr.forEach((item, index) => {
                let enve = null;
                if (item === -20) {
                    enve = <MoneyItemWillOPen key={index} open={this.openMoney} />
                } else if (item === -10) {
                    enve = <MoneyItemWillShow key={index} />
                } else {
                    enve = <MoneyItemDone coins={item} key={index} />
                }
                dataReg.push(enve);
            });

            this.setState({
                coinData: dataReg,
                day: 5 - block
            });

        });

        Api.taskList((e) => {
            let newReg = [];
            let dailyReg = [];
            e.forEach((item, index) => {
                if (item.group === 'new') {
                    const newItem = <TaskItem clickCallback={this.clickCallback} navi={this.props.history} key={index} item={item} />
                    newReg.push(newItem);
                }
                if (item.group === 'daily') {
                    const dailyItem = <TaskItem clickCallback={this.clickCallback} navi={this.props.history} key={index} item={item} />
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
        let heightNew = 72 + 65 * this.state.newData.length;
        let heightDaily = 73 + 65 * this.state.dailyData.length;
        return (
            <div className='image-bg-container' style={{ width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg_image})` }}>
                <div className='image-bg-container' style={{ height: 204, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', backgroundImage: `url(${header_bg_image})` }}>
                    <div style={{ marginTop: 50, marginLeft: 36, color: 'rgb(232,232,232)' }}>已拥有C币</div>
                    <div style={{ fontSize: 38, marginTop: 7, color: 'white', marginLeft: 35, fontWeight: 'bold' }}>{this.props.coins}</div>
                    <div onClick={this.goToPay} style={{ marginLeft: 35, marginTop: 22, height: 32, width: 94, display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(212,81,52)', color: 'rgb(255,210,142)', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>立即充值</div>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    <img style={{ height: 33, width: 351, marginLeft: 1 }} src={require('../../image/task/task_page_top.png')} alt='' />
                </div>
                <div className='image-bg-container' style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -20, height: 163, width: 320, alignSelf: 'center', display: 'flex', flexDirection: 'column', backgroundImage: `url(${page_bg})` }} >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 22, marginLeft: 20 }}>
                        <div style={{ fontSize: 16, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>连续第</div>
                        <div style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>{this.state.day}</div>
                        <div style={{ fontSize: 16, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>天</div>
                    </div>
                    <div style={{ marginTop: 20, height: 70, width: 280, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'end' }}>
                        {this.state.coinData}
                    </div>
                </div>
                <LinkBar />
                <div style={{ marginTop: -12, borderRadius: 10, alignSelf: 'center', height: heightNew, width: 320, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                    <div style={{ fontSize: 16, color: 'rgb(34,34,34)', marginTop: 25, marginLeft: 26, fontWeight: 'bold', marginBottom: 15 }}>新手奖励</div>
                    {this.state.newData}
                </div>
                <LinkBar />
                <div style={{ marginTop: -12, borderRadius: 10, alignSelf: 'center', height: heightDaily, width: 320, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                    <div style={{ fontSize: 16, color: 'rgb(34,34,34)', marginTop: 25, marginLeft: 26, fontWeight: 'bold', marginBottom: 15 }}>日常奖励</div>
                    {this.state.dailyData}
                </div>
                <div style={{ height: 100, width: 320 }} />
            </div>
        );
    }

    clickCallback = (key, state) => {
        if (state === 2) {
            return;
        }
        if (state === 1) {
            Api.taskDoneCoins(key, (e, code, message) => {
                if (message === 'success') {
                    ToastsStore.success('奖励领取成功');
                    Api.taskList((e) => {
                        let newReg = [];
                        let dailyReg = [];
                        e.forEach((item, index) => {
                            if (item.group === 'new') {
                                const newItem = <TaskItem clickCallback={this.clickCallback} navi={this.props.history} key={index} item={item} />
                                newReg.push(newItem);
                            }
                            if (item.group === 'daily') {
                                const dailyItem = <TaskItem clickCallback={this.clickCallback} navi={this.props.history} key={index} item={item} />
                                dailyReg.push(dailyItem);
                            }
                        });
                        this.setState({
                            newData: newReg,
                            dailyData: dailyReg
                        });
                    });
                    if (this.props.login) {
                        Api.userInfo((e) => {
                            store.dispatch(get_user_info(e));
                        });
                    }
                }
            });
        }
        if (state === 0) {
            switch (key) {
                case 'REGISTER':
                    //注册任务默认完成，不需要操作
                    break;
                case 'SAVE_PHOTO':
                    ToastsStore.warning('请在App内完成此任务');
                    break;
                case 'SAVE_CARD':
                    ToastsStore.warning('请在App内完成此任务');
                    break;
                case 'BIND_MOBILE':
                    //web端绑定手机任务默认完成
                    break;
                default:
                    this.props.history.push('/');
                    break;
            }
        }
    }

    openMoney = () => {
        Api.dailySign((e, code, message) => {
            if (message === 'success') {
                let block = e.block;
                let coins = e.coins.reverse();
                let stateArr = [];
                let dataReg = [];
                coins.forEach((item) => {
                    stateArr.push(item.value);
                });
                for (let i = 0; i < block; i++) {
                    if (i === 0) {
                        stateArr.push(-20);
                    } else {
                        stateArr.push(-10);
                    }
                }

                stateArr.forEach((item, index) => {
                    let enve = null;
                    if (item === -20) {
                        enve = <MoneyItemWillOPen key={index} open={this.openMoney} />
                    } else if (item === -10) {
                        enve = <MoneyItemWillShow key={index} />
                    } else {
                        enve = <MoneyItemDone coins={item} key={index} />
                    }
                    dataReg.push(enve);
                });

                this.setState({
                    coinData: dataReg,
                    day: 5 - block
                });
            } else {
                ToastsStore.warning(e.message);
            }
        });
    }

    goToPay = () => {
        if (this.props.login) {
            this.props.history.push('/pay/');
        } else {
            ToastsStore.error('请先登陆！');
        }
    }

}

function mapState2Props(store) {
    return {
        coins: store.user.coins,
        login: store.user.isLogin,
    }
}

const TaskWithRouter = withRouter(connect(mapState2Props)(Task));
export default TaskWithRouter;