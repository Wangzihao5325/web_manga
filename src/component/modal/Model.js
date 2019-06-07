import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { CLIENT_WIDTH } from '../../global/sizes';
import './index.css';

import Banner from './Banner';
import Comic from './Comic';

export default class Model extends Component {

    static defaultProps = {
        data: []
    }

    render() {
        return (
            <div className='scrolllist' style={{ flex: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InfiniteScroll
                    pageStart={0}
                    hasMore={true}
                    useWindow={false}
                    getScrollParent={() => this.scrollParentRef}
                    loadMore={this._loadMore}
                >
                    {
                        this.props.data.map((item, index) => {
                            switch (item.client_module) {
                                case 'm_banner':
                                    return <Banner key={index} data={item.m_banner_data} />;
                                case 'm_comic':
                                    return <Comic key={index} subTitle={item.subtitle} title={item.title} limit={item.client_limit} styleText={item.client_style} data={item.m_comic_data} />;
                            }
                        })
                    }
                    <div style={{ height: 80, width: CLIENT_WIDTH - 24 }} />{/**底部垫高，防止正文部分被bottom遮挡 */}
                </InfiniteScroll>
            </div>
        );
    }

    _loadMore = (page) => {
        if (this.props.loadMore) {
            this.props.loadMore(page);
        }
    }
}