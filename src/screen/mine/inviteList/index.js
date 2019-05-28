import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import { hidden } from 'ansi-colors';
import image_bg from '../../../image/mine/invite_list_bg.png';
import './index.css';
import Api from '../../../socket/index';
import InfiniteScroll from 'react-infinite-scroller';


class InviteList extends PureComponent {

    state = {
        data: []
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.inviteList((e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    data: e.data
                });
            }
        });
    }

    render() {
        const listItems = this.state.data.map((item, index) => {
            return (
                <div key={index} style={{ borderBottomStyle: 'solid', borderBottomColor: 'rgb(244,244,244)', borderBottomWidth: 1, alignSelf: 'center', height: 50, width: CLIENT_WIDTH - 28, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {`${item.nick_name}`}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {`${item.created_at}`}
                    </div>
                </div>
            );
        });
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='邀请记录' back={this.goBack} />
                <div className='mine-header-container' style={{ alignSelf: 'center', marginTop: 23, height: 135, width: 347, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${image_bg})` }}>
                    <div style={{ fontSize: 35, color: 'white' }}>{this.props.invite}</div>
                    <div style={{ fontSize: 14, color: 'white', marginTop: 6 }}>已邀请人数</div>
                </div>

                <div style={{ marginTop: 10, backgroundColor: 'rgb(244,244,244)', height: 42, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ fontSize: 14, color: 'rgb(139,139,139)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        用户名
                    </div>
                    <div style={{ fontSize: 14, color: 'rgb(139,139,139)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        邀请时间
                    </div>
                </div>

                <div style={{ flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }} ref={(ref) => this.scrollParentRef = ref}>
                    <div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadFunc}
                            hasMore={true}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}
                        >
                            {listItems}
                        </InfiniteScroll>
                    </div>
                </div>

            </div>
        );
    }

    loadFunc = (e) => {
        console.log(e);
    }

    goBack = () => {
        this.props.history.push('/mine/');
    }
}

function mapState2Props(store) {
    return {
        invite: store.user.invite,
    }
}

const InviteListWithRouter = withRouter(connect(mapState2Props)(InviteList));
export default InviteListWithRouter;