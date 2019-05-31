import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import Api from '../../../socket/index';
import Model from '../../../component/modal/Model';

class SearchBtn extends PureComponent {
    render() {
        return (
            <div onClick={this.btnOnClick} style={{ alignItems: 'center', flexDirection: 'row', display: 'flex', width: 280, height: 34, borderRadius: 17, backgroundColor: 'rgb(244,244,244)' }}>
                <div><img style={{ height: 17, width: 17, marginLeft: 13 }} src={require('../../../image/main/search.png')} /></div>
                <div style={{ marginLeft: 6, fontSize: 14, color: 'rgb(207,207,207)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>搜索关键词</div>
            </div>
        );
    }

    btnOnClick = () => {
        if (this.props.search) {
            this.props.search();
        }
    }
}

class MangaPage extends PureComponent {

    state = {
        data: [],
        nowPage: -1,
        totalPage: -1,
    }

    static childContextTypes = {
        GLOBAL_TYPE: PropTypes.string,
    }

    getChildContext() {
        return {
            GLOBAL_TYPE: this.props.type
        }
    }

    componentDidMount() {
        Api.viewModule(this.props.type, 'index', 1, 10, (e) => {
            this.setState({
                data: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page,
            });
        });
    }

    render() {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 10, marginBottom: 15, justifyContent: 'space-between', height: 34, width: CLIENT_WIDTH - 24, alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                    <SearchBtn search={this.goToSearch} />
                    <div onClick={this.goToLeaderboard}><img style={{ height: 20, width: 20 }} src={require('../../../image/main/leaderBoard.png')} alt='' /></div>
                    <div onClick={this.goToType}><img style={{ height: 20, width: 20 }} src={require('../../../image/main/main_types.png')} alt='' /></div>
                </div>
                <Model loadMore={this._loadMore} data={this.state.data} />
            </div>
        );
    }

    goToLeaderboard = () => {
        this.props.navi.push('/leaderBoard/');
    }

    goToType = () => {

    }

    goToSearch = () => {
        this.props.navi.push('/search/');
    }

    _loadMore = (page) => {
        if (page >= this.state.totalPage) {
            return;
        }
        let newPage = this.state.nowPage + 1;
        Api.viewModule(this.props.type, 'index', newPage, 10, (e) => {
            let dataArr = [...this.state.data];
            this.setState({
                data: dataArr.concat(e.data),
                nowPage: e.current_page,
                totalPage: e.last_page,
            });
        });
    }
}

export default MangaPage;