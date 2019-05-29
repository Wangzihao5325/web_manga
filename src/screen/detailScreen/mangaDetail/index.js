import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';
import SecurtyImage from '../../../component/securtyImage/Image';
import './index.css';
import 'antd/dist/antd.css';
import { Rate } from 'antd';

class MangaInfoHeader extends PureComponent {

    state = {
        tabs: []
    }

    componentDidMount() {
        let tabDataArr = [];
        if (this.props.item.is_new) {
            tabDataArr.push({ title: '新作', color: 'rgb(255,163,163)' });
        }
        if (this.props.item.is_recommend) {
            tabDataArr.push({ title: '推荐', color: 'rgb(158,244,255)' });
        }
        if (this.props.item.is_pay) {
            tabDataArr.push({ title: '免费', color: 'rgb(255,196,174)' });
        }
        if (this.props.item.dump_status) {
            tabDataArr.push({ title: '完结', color: 'rgb(218,174,255)' });
        }
        this.setState({
            tabs: tabDataArr
        });
    }

    render() {
        return (
            <div style={{ height: 330, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ zIndex: 10, position: 'absolute', top: 81, left: 20, height: 178, width: CLIENT_WIDTH - 40, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ height: 178, width: 121, display: 'flex', flexDirection: 'column' }}>
                        <SecurtyImage borderRadius={4} style={{ height: 178, width: 121 }} source={this.props.item.cover_url} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} >
                        <div style={{ fontSize: 21, color: 'white', marginLeft: 20, marginTop: 10, fontWeight: 'bold' }}>{this.props.item.title}</div>
                        <div style={{ marginTop: 20, marginLeft: 20, height: 20, width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ height: 20, width: 20 }}><img style={{ height: 20, width: 20 }} src={require('../../../image/main/first_fire.png')} alt='' /></div>
                            <div style={{ color: 'rgb(255,42,49)', fontSize: 16, marginLeft: 5, fontWeight: 'bold' }}>1234</div>
                        </div>
                        <div style={{ marginTop: 22, marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                            <Rate disabled defaultValue={2} />
                            <div style={{ color: 'rgb(168,168,168)', fontSize: 19, fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>10</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginTop: 13 }}>
                            {this.state.tabs.map((item, index) => {
                                return <div key={index} style={{ borderRadius: 3, marginRight: 4, height: 18, width: 35, backgroundColor: item.color, color: 'white', fontSize: 11, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>{item.title}</div>
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ height: 175, width: CLIENT_WIDTH, overflow: 'hidden' }}>
                    <div className='blur' style={{ height: 175, width: CLIENT_WIDTH }}>
                        <SecurtyImage style={{ height: 175, width: CLIENT_WIDTH }} source={this.props.item.cover_url} />
                    </div>
                </div>
                <div style={{ marginTop: 84 + 26, width: CLIENT_WIDTH - 40, alignSelf: 'center', color: 'rgb(127,127,127)', fontSize: 15 }}>{this.props.item.intro}</div>
            </div>
        );
    }
}

class MangaDetail extends PureComponent {

    state = {
        mangaInfoObj: null
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const mangaId = this.props.match.params.id;
        const global_type = this.props.match.params.type;
        //查询漫画详情
        Api.comicInfo(global_type, mangaId, (e) => {
            this.setState({
                mangaInfoObj: e
            });
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                {/* <HeaderPro title=' ' back={this.goBack} /> */}
                {this.state.mangaInfoObj && <MangaInfoHeader item={this.state.mangaInfoObj} />}

            </div>
        );
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const MangaDetailWithRouter = withRouter(MangaDetail);
export default MangaDetailWithRouter;