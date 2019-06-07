import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import { FrontCoverHo, FrontCover, HO_HEIGHT, VER_HEIGHT, BannerCover, BANNER_WIDTH, BANNER_TOTAL_HEIGHT, COMIC3_ITEM_HEIGHT, Comic3Item, Comic4Item, COMIC4_TOTAL_HEIGHT, COMIC4_ITEM_WIDTH } from '../../component/frontCover/index';

const SudokuHo_WIDTH = CLIENT_WIDTH - 24;
const BOTTOM_BTN_WIDTH = (SudokuHo_WIDTH - 10) / 2;

class SudokuHo extends Component {

    static defaultProps = {
        title: '',
        data: []
    }

    state = {
        page: 1,
        totalPage: Math.ceil(this.props.data.length / this.props.limit)
    }

    render() {
        const line = this.props.limit / 2;
        const coverHeight = HO_HEIGHT * line;
        const totalHeight = coverHeight + 60 + 64;
        return (
            <div style={{ height: totalHeight, width: SudokuHo_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 20, height: 30, width: SudokuHo_WIDTH, display: 'flex', flexDirection: 'column', fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}>
                    {this.props.title}
                </div>
                <div style={{ marginTop: 10, height: coverHeight, width: SudokuHo_WIDTH, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        this.itemsGen(this.props.data, this.state.page, this.props.limit)
                    }
                </div>
                <div style={{ height: 44, width: SudokuHo_WIDTH, marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={this._more} style={{ height: 44, width: BOTTOM_BTN_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 14, width: 14 }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/more.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>更多</div>
                    </div>
                    <div onClick={this._changePage} style={{ height: 44, width: BOTTOM_BTN_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 14, width: 14 }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/change.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>换一批</div>
                    </div>
                </div>
            </div>
        );
    }

    itemsGen = (data, page, limit) => {
        let result = [];
        for (let i = limit * (page - 1); i < limit * page; i++) {
            if (i >= data.length) {
                break;
            }
            const item = data[i];
            result.push(<FrontCoverHo key={i} title={item.title} intro={item.intro} source={item.cover_url} />);
        }
        return result;
    }

    _more = () => {
        console.log('more');
    }

    _changePage = () => {
        this.setState((preState) => {
            let newPage = preState.page + 1;
            if (newPage > preState.totalPage) {
                newPage = 1;
            }
            return {
                page: newPage
            }
        });
    }
}

const SudokuVe_WIDTH = CLIENT_WIDTH - 24;

class SudokuVe extends Component {
    static defaultProps = {
        title: '',
        data: []
    }

    state = {
        page: 1,
        totalPage: Math.ceil(this.props.data.length / this.props.limit)
    }

    render() {
        const line = this.props.limit / 3;
        const coverHeight = VER_HEIGHT * line;
        const totalHeight = coverHeight + 60 + 64;
        return (
            <div style={{ height: totalHeight, width: SudokuVe_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 10, height: 30, width: SudokuVe_WIDTH, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.title}</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(255,42,49)', fontWeight: 'bold' }}> •</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.subTitle}</div>
                </div>
                <div style={{ marginTop: 10, height: coverHeight, width: SudokuVe_WIDTH, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        this.itemsGen(this.props.data, this.state.page, this.props.limit)
                    }
                </div>
                <div style={{ height: 44, width: SudokuVe_WIDTH, marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={this._more} style={{ height: 44, width: BOTTOM_BTN_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 44, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/more.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>更多</div>
                    </div>
                    <div onClick={this._changePage} style={{ height: 44, width: BOTTOM_BTN_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 44, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/change.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>换一批</div>
                    </div>
                </div>
            </div>
        );
    }

    itemsGen = (data, page, limit) => {
        let result = [];
        for (let i = limit * (page - 1); i < limit * page; i++) {
            if (i >= data.length) {
                break;
            }
            const item = data[i];
            result.push(
                <FrontCover
                    key={i}
                    title={item.title}
                    intro={item.intro}
                    source={item.cover_url}
                    coverClick={() => {
                        if (item.global_type === 'hanman' || item.global_type === 'hman') {
                            this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`)
                        }
                        // to do video
                    }}

                />
            );
        }
        return result;
    }

    _more = () => {
        console.log('more');
    }

    _changePage = () => {
        this.setState((preState) => {
            let newPage = preState.page + 1;
            if (newPage > preState.totalPage) {
                newPage = 1;
            }
            return {
                page: newPage
            }
        });
    }
}

const Comic2_WIDTH = CLIENT_WIDTH - 24;

class Comic2 extends Component {

    state = {
        page: 1,
        totalPage: Math.ceil(this.props.data.length / 4)
    }

    render() {
        let bannerData = this.props.data[(this.state.page - 1) * 4];
        const totalHeight = 30 + BANNER_TOTAL_HEIGHT + VER_HEIGHT + 44 + 50;
        return (
            <div style={{ height: totalHeight, width: Comic2_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 10, height: 30, width: SudokuVe_WIDTH, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.title}</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(255,42,49)', fontWeight: 'bold' }}> •</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.subTitle}</div>
                </div>

                <div style={{ height: BANNER_TOTAL_HEIGHT, width: BANNER_WIDTH, display: 'flex', flexDirection: 'column' }}>
                    <BannerCover
                        title={bannerData.title}
                        intro={bannerData.intro}
                        source={bannerData.banner_url ? bannerData.banner_url : bannerData.cover_url}
                        coverClick={() => {
                            if (bannerData.global_type === 'hanman' || bannerData.global_type === 'hman') {
                                this.props.navi.push(`/manga_detail/${bannerData.id}/${bannerData.global_type}`)
                            }
                            // to do video
                        }}
                    />
                </div>

                <div style={{ marginTop: 10, height: VER_HEIGHT, width: Comic2_WIDTH, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        this.itemsGen(this.props.data, this.state.page)
                    }
                </div>

                <div style={{ height: 44, width: SudokuVe_WIDTH, marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={this._more} style={{ height: 44, width: BOTTOM_BTN_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 44, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/more.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>更多</div>
                    </div>
                    <div onClick={this._changePage} style={{ height: 44, width: BOTTOM_BTN_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 44, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/change.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>换一批</div>
                    </div>
                </div>
            </div>
        );
    }

    itemsGen = (data, page) => {
        let result = [];
        for (let i = 4 * (page - 1) + 1; i < 4 * page; i++) {
            if (i >= data.length) {
                break;
            }
            const item = data[i];
            result.push(
                <FrontCover
                    key={i}
                    title={item.title}
                    intro={item.intro}
                    source={item.cover_url}
                    coverClick={() => {
                        if (item.global_type === 'hanman' || item.global_type === 'hman') {
                            this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`)
                        }
                        // to do video
                    }}

                />
            );
        }
        return result;
    }

    _more = () => {
        console.log('more');
    }

    _changePage = () => {
        this.setState((preState) => {
            let newPage = preState.page + 1;
            if (newPage > preState.totalPage) {
                newPage = 1;
            }
            return {
                page: newPage
            }
        });
    }
}

const Comic3_WIDTH = CLIENT_WIDTH - 24;

class Comic3 extends Component {
    render() {
        let Comic3_ITEMS_HEIGHT = COMIC3_ITEM_HEIGHT * 3 + 20;
        if (this.props.data.length < 3) {
            Comic3_ITEMS_HEIGHT = COMIC3_ITEM_HEIGHT * this.props.data.length + 20;
        }
        const totalHeight = Comic3_ITEMS_HEIGHT + 64 + 50;
        return (
            <div style={{ width: Comic3_WIDTH, height: totalHeight, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 10, height: 30, width: SudokuVe_WIDTH, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.title}</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(255,42,49)', fontWeight: 'bold' }}> •</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.subTitle}</div>
                </div>
                <div style={{ width: Comic3_WIDTH, height: Comic3_ITEMS_HEIGHT, display: 'flex', flexDirection: 'column' }}>
                    {this.itemsGen(this.props.data)}
                </div>
                <div style={{ height: 44, width: SudokuVe_WIDTH, marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={this._more} style={{ height: 44, width: SudokuHo_WIDTH, backgroundColor: 'rgb(244,244,244)', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: 44, width: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><img style={{ height: 14, width: 14 }} src={require('../../image/main/more.png')} alt='' /></div>
                        <div style={{ fontSize: 14, color: 'rgb(152,152,152)', marginLeft: 5 }}>更多</div>
                    </div>
                </div>
            </div>
        );
    }

    itemsGen = (data) => {
        let result = [];
        data.every((item, index) => {
            if (index > 2) {
                return false;
            }
            result.push(
                <Comic3Item
                    index={index}
                    key={index}
                    item={item}
                    coverClick={() => {
                        if (item.global_type === 'hanman' || item.global_type === 'hman') {
                            this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`)
                        }
                        // to do video
                    }}
                />);
            return true;
        });
        return result;
    }

    _more = () => {
        console.log('more');
    }

    _changePage = () => {

    }
}

const Comic4_WIDTH = CLIENT_WIDTH - 24;
const Comic4_HEIGHT = COMIC4_TOTAL_HEIGHT + 50;

class Comic4 extends Component {
    render() {
        const items = this.itemsGen(this.props.data);
        return (
            <div style={{ height: Comic4_HEIGHT, width: Comic4_WIDTH, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: 10, height: 30, width: SudokuVe_WIDTH, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.title}</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(255,42,49)', fontWeight: 'bold' }}> •</div>
                    <div style={{ marginLeft: 3, fontSize: 20, color: 'rgb(34,34,34)', fontWeight: 'bold' }}> {this.props.subTitle}</div>
                </div>
                <div style={{ height: COMIC4_TOTAL_HEIGHT, width: Comic4_WIDTH }}>
                    <ScrollMenu
                        data={items}
                        onSelect={this.onSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
            </div>
        );
    }

    itemsGen = (data) => {
        let result = [];
        data.every((item, index) => {
            if (index >= this.props.limit) {
                return false;
            }
            result.push(
                <Comic4Item
                    index={index}
                    key={index}
                    item={item}
                    coverClick={
                        () => {
                            if (item.global_type === 'hanman' || item.global_type === 'hman') {
                                this.props.navi.push(`/manga_detail/${item.id}/${item.global_type}`)
                            }
                            // to do video
                        }}
                />);
            return true;
        });
        return result;
    }

    onSelect = (key) => {
        console.log(key);
    }
}

class Comic extends Component {

    static contextTypes = {
        GLOBAL_TYPE: PropTypes.string
    }

    render() {
        const { GLOBAL_TYPE } = this.context;
        switch (this.props.styleText) {
            /*
            case 's_sudoku_2':
                return <SudokuHo title={this.props.title} data={this.props.data} limit={this.props.limit} />;
                */
            case 'comic_1':
                return <SudokuVe navi={this.props.history} globalType={GLOBAL_TYPE} title={this.props.title} subTitle={this.props.subTitle} data={this.props.data} limit={this.props.limit} />;
            case 'comic_2':
                return <Comic2 navi={this.props.history} globalType={GLOBAL_TYPE} title={this.props.title} subTitle={this.props.subTitle} data={this.props.data} />;
            case 'comic_3':
                return <Comic3 navi={this.props.history} globalType={GLOBAL_TYPE} title={this.props.title} subTitle={this.props.subTitle} data={this.props.data} limit={this.props.limit} />;
            case 'comic_4':
                return <Comic4 navi={this.props.history} globalType={GLOBAL_TYPE} title={this.props.title} subTitle={this.props.subTitle} data={this.props.data} limit={this.props.limit} />;
            default:
                return null;
        }
    }
}

const ComicWithRouter = withRouter(Comic);
export default ComicWithRouter;