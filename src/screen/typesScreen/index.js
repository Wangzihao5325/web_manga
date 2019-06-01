import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import { tab_navi_unshow } from '../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import Api from '../../socket/index';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu, WIDTH as ITEM_WIDTH } from '../../component/tabSelect/TypeSelect';


class TypeScreen extends PureComponent {

    state = {
        paySelect: -1,
        payData: [],
        sortSelect: -1,
        sortData: [],
        stateSelect: -1,
        stateData: [],
        typeSelect: -1,
        typeData: []
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.mangaType((e) => {
            this.setState({
                payData: e.pay,
                sortData: e.sort,
                stateData: e.state,
                typeData: e.type,
                paySelect: e.pay.length > 0 ? e.pay[0].name : -1,
                sortSelect: e.sort.length > 0 ? e.sort[0].name : -1,
                stateSelect: e.state.length > 0 ? e.state[0].name : -1,
                typeSelect: e.type.length > 0 ? e.type[0].name : -1,
            });
        });
    }

    render() {
        const { paySelect, payData, sortSelect, sortData, stateSelect, stateData, typeSelect, typeData } = this.state;
        const payMenu = Menu(payData, paySelect);
        const payWidth = ITEM_WIDTH * payData.length < CLIENT_WIDTH ? ITEM_WIDTH * payData.length : CLIENT_WIDTH;
        const sortMenu = Menu(sortData, sortSelect);
        const sortWidth = ITEM_WIDTH * sortData.length < CLIENT_WIDTH ? ITEM_WIDTH * sortData.length : CLIENT_WIDTH;
        const stateMenu = Menu(stateData, stateSelect);
        const stateWidth = ITEM_WIDTH * stateData.length < CLIENT_WIDTH ? ITEM_WIDTH * stateData.length : CLIENT_WIDTH;
        const typeMenu = Menu(typeData, typeSelect);
        const typeWidth = ITEM_WIDTH * typeData.length < CLIENT_WIDTH ? ITEM_WIDTH * typeData.length : CLIENT_WIDTH;
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='分类' back={this.goBack} />
                <div style={{ height: 29, width: payWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={payMenu}
                        selected={paySelect}
                        onSelect={this._paySelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: sortWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={sortMenu}
                        selected={sortSelect}
                        onSelect={this._sortSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: stateWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={stateMenu}
                        selected={stateSelect}
                        onSelect={this._stateSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
                <div style={{ height: 29, width: typeWidth, marginTop: 10 }}>
                    <ScrollMenu
                        data={typeMenu}
                        selected={typeSelect}
                        onSelect={this._typeSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
            </div>
        );
    }

    _paySelect = (key) => {
        this.setState({
            paySelect: key
        });
    }

    _sortSelect = (key) => {
        this.setState({
            sortSelect: key
        });
    }

    _stateSelect = (key) => {
        this.setState({
            stateSelect: key
        });
    }

    _typeSelect = (key) => {
        this.setState({
            typeSelect: key
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const TypeScreenWithRouter = withRouter(TypeScreen);
export default TypeScreenWithRouter;