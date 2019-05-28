import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import InfiniteScroll from 'react-infinite-scroller';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';
import SecurtyImage from '../../../component/securtyImage/Image';

class ImageItem extends PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', marginTop: 12 }}>
                <SecurtyImage source={this.props.source} style={{ display: 'flex', flexDirection: 'column' }} isFlexType={true} regWidth={CLIENT_WIDTH - 24} style={{}} />
            </div>
        );
    }
}

class CGDetail extends PureComponent {
    state = {
        data: [],
        nowPage: -1,
        totalPage: -1,
        title: ''
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        const cgId = parseInt(this.props.match.params.id);
        const title = this.props.match.params.title;
        Api.mangaImage('cg', cgId, 0, 1, 10, (e) => {
            this.setState({
                title,
                data: e.data,
                nowPage: e.current_page,
                totalPage: e.last_page,
            });
        });
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title={this.state.title} back={this.goBack} />
                <div style={{ height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                        getScrollParent={() => this.scrollParentRef}
                        threshold={100}
                        loadMore={this._loadMore}
                    >
                        {
                            this.state.data.map((item, index) => {
                                return <ImageItem source={item.image_url} key={index} />
                            })
                        }
                        {/* <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />*/}{/**底部垫高，防止正文部分被bottom遮挡 */}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.goBack();
    }

    _loadMore = () => {
        if (this.state.nowPage >= this.state.totalPage) {
            return;
        }
        const cgId = parseInt(this.props.match.params.id);
        const newPage = this.state.nowPage + 1;
        Api.mangaImage('cg', cgId, 0, newPage, 10, (e) => {
            let regData = [...this.state.data];
            let newData = regData.concat(e.data);
            this.setState({
                data: newData,
                nowPage: e.current_page,
                totalPage: e.last_page,
            });
        });
    }
}

const CGDetailWithRouter = withRouter(CGDetail);
export default CGDetailWithRouter;