import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../component/tabSelect/ScrollTabSelect';
import Api from '../../socket/index';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import MangaPage from './contentPage/MangaPage';

class Home extends Component {

    state = {
        selected: 0,
        data: []
    };

    onSelect = key => {
        this.setState({ selected: key });
    }

    componentDidMount() {
        Api.comicGlobal((e) => {
            this.setState({
                data: e
            });
        });
    }

    render() {
        const { selected } = this.state;
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

                <MangaPage />
            </div>
        );
    }
}

const HomeWithRouter = withRouter(Home);
export default HomeWithRouter;