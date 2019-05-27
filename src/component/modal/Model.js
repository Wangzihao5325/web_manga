import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Banner from './Banner';

export default class Model extends Component {

    static defaultProps = {
        data: []
    }

    render() {

        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
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
                            }
                        })
                    }
                </InfiniteScroll>
            </div>
        );
    }

    _loadMore = () => {

    }
}