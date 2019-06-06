import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import { ToastsStore } from 'react-toasts';
import Api from '../../socket/index';

const textReg = { content: '' };

class Search extends PureComponent {

    state = {
        isSearch: false
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >

                <div style={{ height: 38, marginTop: 5, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ marginLeft: 12, height: 34, width: CLIENT_WIDTH - 70, backgroundColor: 'rgb(244,244,244)', borderRadius: 17, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ marginLeft: 12, height: 34, width: 17, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 17, width: 17 }} src={require('../../image/main/search.png')} alt='' /></div>
                        <input onKeyUp={this.onKeyup} onChange={this.inputOnChange} style={{ marginLeft: 5, outline: 'none', height: 24, width: 150, borderColor: 'rgb(244,244,244)', borderStyle: 'solid', borderWidth: 1, backgroundColor: 'rgb(244,244,244)' }} type='text' placeholder='搜索关键词' />
                    </div>
                    <div onClick={this.goBack} style={{ fontSize: 15, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'rgb(34,34,34)' }}>
                        取消
                    </div>
                </div>

                {
                    !this.state.isSearch &&
                    <div></div>
                }
            </div>
        );
    }

    inputOnChange = ({ target }) => {
        textReg.content = target.value;
    }

    onKeyup = (e) => {
        if (e.keyCode === 13) {
            const type = this.props.match.params.type;
            const title = textReg.content;
            Api.searchByType(type, title, 1, 10, (e) => {
                console.log(e);
            });
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;