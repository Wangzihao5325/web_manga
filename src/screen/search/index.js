import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import { ToastsStore } from 'react-toasts';
import Api from '../../socket/index';
import './index.css';

const textReg = { content: '' };

class KeyWordsItem extends PureComponent {

    static defaultProps = {
        title: '    ',
        value: ''
    }

    render() {
        let color = 'rgb(168,168,168)';
        let textColor = 'rgb(34,34,34)';
        let length = this.props.title.length * 13 + 24;
        return (
            <div onClick={this.itemSelect} style={{ marginTop: 10, marginLeft: 5, marginRight: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 34, width: length, borderRadius: 17, backgroundColor: 'white', borderColor: color, borderStyle: 'solid', borderWidth: 1 }}>
                <div className='text_div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 12, marginRight: 12, color: textColor, fontSize: 13, }}>
                    {this.props.title}
                </div>
            </div>
        );
    }

    itemSelect = () => {
        if (this.props.clickCallback) {
            this.props.clickCallback(this.props.item);
        }
    }
}

class Search extends PureComponent {

    state = {
        isSearch: false,
        hotData: []
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const type = this.props.match.params.type;
        Api.guessLike(type, 1, (e) => {
            let data = e.data;
            if (data.length > 6) {
                data.length = 6;
            }
            this.setState({
                hotData: data
            });
        });
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
                    <div style={{ marginTop: 10, alignSelf: 'center', display: 'flex', height: 30, width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ marginLeft: 12, color: 'rgb(168,168,168)', fontSize: 14 }}>热门搜索</div>
                        <div ></div>
                    </div >
                }

                {

                    !this.state.isSearch &&
                    <div style={{ alignSelf: 'center', display: 'flex', width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        {
                            this.state.hotData.map((item, index) => {
                                return <KeyWordsItem clickCallback={this.itemClick} key={index} item={item} value={item.id} title={item.title} />
                            })
                        }
                    </div >
                }
            </div>
        );
    }

    itemClick = (item) => {
        this.props.history.push(`/manga_detail/${item.id}/${item.global_type}`)
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