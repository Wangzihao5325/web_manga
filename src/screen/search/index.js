import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';


class Search extends PureComponent {

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='搜索' back={this.goBack} />
                <div style={{ height: 40, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    
                </div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;