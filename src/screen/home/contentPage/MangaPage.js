import React, { PureComponent } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import Api from '../../../socket/index';

class SearchBtn extends PureComponent {
    render() {
        return (
            <div style={{ alignItems: 'center', flexDirection: 'row', display: 'flex', width: 280, height: 34, borderRadius: 17, backgroundColor: 'rgb(244,244,244)' }}>
                <div><img style={{ height: 17, width: 17, marginLeft: 13 }} src={require('../../../image/main/search.png')} /></div>
                <div style={{ marginLeft: 6, fontSize: 14, color: 'rgb(207,207,207)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>搜索关键词</div>
            </div>
        );
    }
}

class MangaPage extends PureComponent {

    componentDidMount() {
        Api.viewModule('hanman', 'index', 1, 4, (e) => {

        });
    }

    render() {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ justifyContent: 'space-between', height: 34, width: CLIENT_WIDTH - 24, alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                    <SearchBtn />
                    <div><img style={{ height: 20, width: 20 }} src={require('../../../image/main/leaderBoard.png')} alt='' /></div>
                    <div><img style={{ height: 20, width: 20 }} src={require('../../../image/main/main_types.png')} alt='' /></div>
                </div>
            </div>
        );
    }
}

export default MangaPage;