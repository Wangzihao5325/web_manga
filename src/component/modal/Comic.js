import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import { FrontCoverHo, HO_HEIGHT } from '../../component/frontCover/index';


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

class SudokuVe extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

class Gundong extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

export default class Comic extends Component {

    static defaultProps = {
        styleText: 's_sudoku_2',
        data: [],
        limit: 4,
    }

    render() {
        switch (this.props.styleText) {
            case 's_sudoku_2':
                return <SudokuHo title={this.props.title} data={this.props.data} limit={this.props.limit} />;
            case 's_sudoku_3':
                return <SudokuHo title={this.props.title} data={this.props.data} limit={this.props.limit} />;
            default:
                return null;
        }
    }
}