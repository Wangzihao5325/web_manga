import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';
import {} from '../../../component/securtyImage/Image'

class MangaInfoHeader extends PureComponent {
    render() {
        return (
            <div style={{ height: 330, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{height:175,width:CLIENT_WIDTH}}>
                    
                </div>
            </div>
        );
    }
}

class MangaDetail extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const mangaId = this.props.match.params.id;
        const global_type = this.props.match.params.type;
        //查询漫画详情
        Api.comicInfo(global_type, mangaId, (e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='manga detail' back={this.goBack} />
                <div></div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const MangaDetailWithRouter = withRouter(MangaDetail);
export default MangaDetailWithRouter;