import React, { Component } from 'react';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';

class Item extends Component {

    static defaultProps = {
        bottomWidth: 38,
        bottomSelectColor: 'rgb(255,29,35)',
        bottomUnselectColor: 'white'
    };

    render() {
        const isSelect = this.props.highlightIndex === this.props.index ? true : false
        return (
            <div onClick={this.itemPress} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={
                    {
                        height: 42,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: isSelect ? 'rgb(255,29,35)' : 'rgb(34,34,34)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }>
                    {this.props.item.title}
                </div>
                <div style={
                    {
                        display: 'flex',
                        alignSelf: 'center',
                        borderRadius: 1,
                        height: 3,
                        width: this.props.bottomWidth,
                        backgroundColor: isSelect ? this.props.bottomSelectColor : this.props.bottomUnselectColor
                    }
                }>

                </div>
            </div>
        );
    }

    itemPress = () => {
        if (this.props.callback) {
            this.props.callback(this.props.item.key, this.props.index, this.props.item.title);
        }
    }

}

export default class TabSelect extends Component {

    constructor(props) {
        super(props);
        this.contentArr = this.props.data ? this.props.data : [];
        this.state = {
            highlightIndex: 0
        };
    }


    render() {

        return (
            <div style={
                {
                    height: 46,
                    width: CLIENT_WIDTH,
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottomColor: 'rgb(244,244,244)',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 1
                }
            }>
                {
                    this.contentArr.map((item, index) => {
                        return (
                            <Item callback={this.itemPress} item={item} key={index} index={index} highlightIndex={this.state.highlightIndex} />
                        );
                    })
                }
            </div>
        );
    }

    itemPress = (key, index, title) => {
        this.setState({
            highlightIndex: index
        }, () => {
            if (this.props.callback) {
                this.props.callback(key, index, title);
            }
        });
    }
}