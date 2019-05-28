import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';


class CGDetail extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const cgId = parseInt(this.props.match.params.id);
        Api.mangaImage('cg', cgId, 0, 1, 10, (e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='CGDetail' back={this.goBack} />
            </div>
        );
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const CGDetailWithRouter = withRouter(CGDetail);
export default CGDetailWithRouter;