import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import InfiniteScroll from 'react-infinite-scroller';
import SecurtyImage from '../../../component/securtyImage/Image';

import Masonry from 'react-masonry-infinite';
import shortid from 'shortid';
import Api from '../../../socket/index';
import './index.css';

const ItemWidth = CLIENT_WIDTH / 2 - 12;

class Item extends Component {
    render() {
        const ItemImageHeight = (this.props.item.height / this.props.item.width) * ItemWidth;
        const ItemHeight = ItemImageHeight + 31;
        return (
            <div onClick={this.itemClick} style={{ width: ItemWidth, height: ItemHeight, display: 'flex', flexDirection: 'column', marginTop: 12, borderRadius: 4 }}>
                <div style={{ height: ItemImageHeight, width: ItemWidth }}>
                    <SecurtyImage borderRadius={4} style={{ height: ItemImageHeight, width: ItemWidth }} source={this.props.item.cover_url} />
                </div>
                <div style={{ height: 31, width: ItemWidth, backgroundColor: 'white', borderRadius: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div className='text_div' style={{ flex: 1, marginLeft: 2, fontSize: 13, color: 'rgb(0,0,0)' }}>{this.props.item.title}</div>
                    <div style={{ height: 31, width: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><img style={{ height: 12, width: 12 }} src={require('../../../image/mine/aliPay.png')} alt='' /></div>
                    <div style={{ height: 31, width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 12, color: 'rgb(168,168,168)' }}>652</div>
                </div>
            </div>
        );
    }

    itemClick = () => {
        if (this.props.itemClick) {
            this.props.itemClick(this.props.item.id);
        }
    }
}

class CGPage extends Component {


    state = {
        nowPage: -1,
        totalPage: -1,
        data1: [],
        data2: []
    }

    componentDidMount() {
        Api.specialList(this.props.type, null, 1, 10, (e) => {
            console.log(e);
            let originData = e.lists.data;
            let data1Result = [];
            let data2Result = [];
            originData.forEach((item, index) => {
                if (index % 2 === 0) {
                    data1Result.push(<Item itemClick={this._goToDetail} key={item.title} item={item} />);
                } else {
                    data2Result.push(<Item itemClick={this._goToDetail} key={item.title} item={item} />);
                }
            });
            this.setState({
                data1: data1Result,
                data2: data2Result,
                nowPage: e.lists.current_page,
                totalPage: e.lists.last_page,
            });
        });
    }


    render() {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <InfiniteScroll
                    pageStart={0}
                    hasMore={true}
                    useWindow={false}
                    getScrollParent={() => this.scrollParentRef}
                    loadMore={this._loadMore}
                >
                    {
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(249,249,249)' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {this.state.data1}
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {this.state.data2}
                            </div>
                        </div>
                    }
                    <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                </InfiniteScroll>
            </div>
        );
    }

    _loadMore = (page) => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        let newPage = this.state.nowPage + 1;

        Api.specialList(this.props.type, null, newPage, 10, (e) => {
            let originData = e.lists.data;
            let data1Result = [...this.state.data1];
            let data2Result = [...this.state.data2];
            originData.forEach((item, index) => {
                if (index % 2 === 0) {
                    data1Result.push(<Item key={item.title} item={item} />);
                } else {
                    data2Result.push(<Item key={item.title} item={item} />);
                }
            });
            this.setState({
                data1: data1Result,
                data2: data2Result,
                nowPage: e.lists.current_page,
                totalPage: e.lists.last_page,
            });
        });
    }

    _goToDetail = (id) => {
        this.props.history.push(`/cg_detail/${id}`);
    }
}

const CGPageWithRouter = withRouter(CGPage);
export default CGPageWithRouter;