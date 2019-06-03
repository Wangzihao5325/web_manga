import React, { PureComponent } from 'react';
import Api from '../../socket/index';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import InfiniteScroll from 'react-infinite-scroller';
import { Menu as InnerMenu } from '../../component/tabSelect/CollectSelect';

const mangaTypeData = [{ name: '韩漫' }, { name: 'H漫画' }, { name: '动漫' }];

export default class Collect extends PureComponent {

    state = {
        innerSelected: '韩漫',
    }

    componentDidMount() {
      //  Api.mangaCollect();
    }

    render() {
        const { innerSelected } = this.state;
        const innerMenu = InnerMenu(mangaTypeData, innerSelected);
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 29, width: 190, marginTop: 10, marginLeft: 1 }}>
                    <ScrollMenu
                        dragging={false}
                        data={innerMenu}
                        selected={innerSelected}
                        onSelect={this.onInnerSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
            </div>
        );
    }
}