import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import store from '../../store/index';
import { tab_navi_show } from '../../store/actions/tabBottomNaviAction';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import { Menu } from '../../component/tabSelect/ScrollTabSelect';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import History from './History';
import CollectList from './Collect';

const tabData = [{ name: '历史' }, { name: '收藏' }];

class Collect extends PureComponent {

    state = {
        selected: '历史',
        isEditMode: false
    }

    componentDidMount() {
        store.dispatch(tab_navi_show());
    }

    render() {
        const { selected } = this.state;
        const menu = Menu(tabData, selected);
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {this.state.isEditMode &&
                    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, height: 47, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1, backgroundColor: 'white' }}>
                        <div style={{ fontWeight: 'bold', height: 43, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />

                        <div style={{ fontWeight: 'bold', height: 43, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {`已选${0}本`}
                        </div>
                        <div onClick={this._closeEditMode} style={{ fontWeight: 'bold', height: 43, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            完成
                    </div>
                    </div>
                }
                <div style={{ height: 47, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(244,244,244)', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                    <div style={{ height: 46, width: 160 }} >
                        <ScrollMenu
                            data={menu}
                            selected={selected}
                            onSelect={this.onSelect}
                            itemStyle={{ outline: 'none' }}
                        />
                    </div>
                    <div onClick={this._openEditMode} style={{ fontWeight: 'bold', height: 43, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        编辑
                    </div>
                </div>

                {this.state.selected === '历史' &&
                    <History navi={this.props.history} isEditMode={this.state.isEditMode} />
                }
                {this.state.selected === '收藏' &&
                    <CollectList navi={this.props.history} isEditMode={this.state.isEditMode} />
                }
            </div>
        );
    }

    onSelect = (key) => {
        this.setState({
            selected: key
        });
    }

    _openEditMode = () => {
        this.setState({
            isEditMode: true
        });
    }

    _closeEditMode = () => {
        this.setState({
            isEditMode: false
        });
    }

}

const CollectWithRouter = withRouter(Collect);
export default CollectWithRouter;