import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ToastsStore } from 'react-toasts';
import store from '../../store/index';
import { tab_navi_select_change } from '../../store/actions/tabBottomNaviAction';


//image
import main_active from '../../image/main_tab_active.png';
import main_default from '../../image/main_tab_default.png';
import collect_active from '../../image/collect_tab_active.png';
import collect_default from '../../image/collect_tab_default.png';
import task_active from '../../image/task_tab_active.png';
import task_default from '../../image/task_tab_default.png';
import mine_active from '../../image/mine_tab_active.png';
import mine_default from '../../image/mine_tab_default.png';

class Item extends Component {

    render() {
        let image = this.props.highLightIndex === this.props.index ? this.props.icon : this.props.defalut;
        return (
            <div
                onClick={this.btnClick}
                style={{
                    height: 69,
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <img style={{ height: 25, width: 25, alignSelf: 'center' }} src={image} alt='' />
                <div style={{ marginTop: 2 }}>{this.props.name}</div>
            </div>
        );
    }

    btnClick = () => {
        if (this.props.highLightIndex === this.props.index) {
            return;
        }

        switch (this.props.index) {
            case 0:
                this.props.navi.push('/');
                break;
            case 1:
                if (!this.props.isLogin) {
                    ToastsStore.warning('请先登陆！');
                    return;
                }
                this.props.navi.push('/collect/');
                break;
            case 2:
                if (!this.props.isLogin) {
                    ToastsStore.warning('请先登陆！');
                    return;
                }
                this.props.navi.push('/task/');
                break;
            case 3:
                this.props.navi.push('/mine/');
                break;
            default:
                break;
        }
        this.props.callback(this.props.index);
    }
}

class Footer extends Component {

    render() {
        return (
            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    height: 69,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopColor: 'rgb(245,245,245)',
                    borderTopWidth: 1,
                    borderTopStyle: 'solid',
                    display: 'flex',
                    flexDirection: 'row',
                    zIndex: 20
                }}
            >
                <Item isLogin={this.props.isLogin} navi={this.props.history} callback={this.pressCallback} index={0} highLightIndex={this.props.naviHighlightIndex} icon={main_active} defalut={main_default} name={'首页'} />
                <Item isLogin={this.props.isLogin} navi={this.props.history} callback={this.pressCallback} index={1} highLightIndex={this.props.naviHighlightIndex} icon={collect_active} defalut={collect_default} name={'书架'} />
                <Item isLogin={this.props.isLogin} navi={this.props.history} callback={this.pressCallback} index={2} highLightIndex={this.props.naviHighlightIndex} icon={task_active} defalut={task_default} name={'任务'} />
                <Item isLogin={this.props.isLogin} navi={this.props.history} callback={this.pressCallback} index={3} highLightIndex={this.props.naviHighlightIndex} icon={mine_active} defalut={mine_default} name={'我的'} />
            </div>
        );
    }

    pressCallback = (index) => {
        store.dispatch(tab_navi_select_change(index));
    }
}

function mapState2Props(store) {
    return {
        isLogin: store.user.isLogin,
        naviHighlightIndex: store.tabNavi.highlightIndex,
    }
}

const FooterWithRouter = withRouter(connect(mapState2Props)(Footer));
export default FooterWithRouter;