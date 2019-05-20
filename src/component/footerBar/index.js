import React, { Component } from 'react';
//import './index.css';
import main_active from '../../image/main_tab_active.png';
import main_default from '../../image/main_tab_default.png';
import collect_active from '../../image/collect_tab_active.png';
import collect_default from '../../image/collect_tab_default.png';
import task_active from '../../image/task_tab_active.png';
import task_default from '../../image/task_tab_default.png';
import mine_active from '../../image/mine_tab_active.png';
import mine_default from '../../image/mine_tab_default.png';

class Item extends Component {

    render() {
        let image = this.props.highLightIndex == this.props.index ? this.props.icon : this.props.defalut;
        return (
            <div
                onClick={this.btnClick}
                style={{
                    height: 69,
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <img style={{ height: 25, width: 25, alignSelf: 'center' }} src={image} />
                <div style={{ marginTop: 2 }}>{this.props.name}</div>
            </div>
        );
    }

    btnClick = () => {
        if (this.props.highLightIndex == this.props.index) {
            return;
        }

        switch (this.props.index) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
        console.log('1111');
        this.props.callback(this.props.index);
    }
}

export default class Footer extends Component {

    state = {
        highlightIndex: 0
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: 69,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopColor: 'red',
                    borderTopWidth: 1,
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Item callback={this.pressCallback} index={0} highLightIndex={this.state.highlightIndex} icon={main_active} defalut={main_default} name={'首页'} />
                <Item callback={this.pressCallback} index={1} highLightIndex={this.state.highlightIndex} icon={collect_active} defalut={collect_default} name={'书架'} />
                <Item callback={this.pressCallback} index={2} highLightIndex={this.state.highlightIndex} icon={task_active} defalut={task_default} name={'任务'} />
                <Item callback={this.pressCallback} index={3} highLightIndex={this.state.highlightIndex} icon={mine_active} defalut={mine_default} name={'我的'} />
            </div>
        );
    }

    pressCallback = (index) => {
        this.setState({
            highlightIndex: index
        });
    }
}