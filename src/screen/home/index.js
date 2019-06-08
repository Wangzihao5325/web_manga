import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store/index';
import { tab_navi_show, tab_navi_select_change } from '../../store/actions/tabBottomNaviAction';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../component/tabSelect/ScrollTabSelect';
import Api from '../../socket/index';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import { ToastsStore } from 'react-toasts';


import MangaPage from './contentPage/MangaPage';
import UpdatePage from './contentPage/UpdatePage';
import CGPage from './contentPage/CGPage';

const reg = { keyMap: {} };

class Home extends Component {

    state = {
        selected: 0,
        data: []
    };

    onSelect = key => {
        if (this.props.isLogin) {
            this.setState({ selected: key });
        } else {
            ToastsStore.warning('请先登陆');
        }
    }

    componentDidMount() {
        store.dispatch(tab_navi_show());
        store.dispatch(tab_navi_select_change(0));
        Api.comicGlobal((e) => {
            let keyArr = e.map((item) => {
                reg.keyMap[item.name] = item.key;
                return item.key;
            });

            this.setState({
                data: e,
                selected: e[1].name,
                keys: keyArr
            });

        });
    }

    render() {
        const { selected, data } = this.state;
        // Create menu from items
        const menu = Menu(this.state.data, selected);
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1, width: CLIENT_WIDTH - 16 - 12 - 12 }} >
                        <ScrollMenu
                            data={menu}
                            selected={selected}
                            onSelect={this.onSelect}
                            itemStyle={{ outline: 'none' }}
                        />
                    </div>
                    <div style={{ marginRight: 12, marginLeft: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img style={{ height: 16, width: 16 }} src={require('../../image/main/main_more.png')} alt='' />
                    </div>
                </div>
                {reg.keyMap[this.state.selected] === 'recommend' && <UpdatePage navi={this.props.history} />}
                {reg.keyMap[this.state.selected] === 'hanman' && <MangaPage type='hanman' navi={this.props.history} />}
                {reg.keyMap[this.state.selected] === 'hman' && <MangaPage type='hman' navi={this.props.history} />}
                {reg.keyMap[this.state.selected] === 'anime' && <MangaPage type='anime' navi={this.props.history} />}
                {reg.keyMap[this.state.selected] === 'cg' && <CGPage type='cg' />}
                {reg.keyMap[this.state.selected] === 'cosplay' && <CGPage type='cosplay' />}
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        isLogin: store.user.isLogin,
    }
}

const HomeWithRouter = withRouter(connect(mapState2Props)(Home));
export default HomeWithRouter;