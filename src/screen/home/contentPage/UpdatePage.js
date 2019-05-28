import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../../global/sizes';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu } from '../../../component/tabSelect/WeekSelect';


export default class UpdatePage extends Component {

    state = {
        selected: 0,
        weekData: []
    };

    componentDidMount() {
        let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        let today = new Date().getDay();
        let reg = week.slice(0, today + 1);
        week.splice(7, 0, ...reg);
        week.splice(0, today + 1);
        week[6] = 'new';
        week[5] = '昨日';
        this.setState({
            weekData: week,
            selected: week[6]
        });
    }

    render() {
        const { selected, weekData } = this.state;
        // Create menu from items
        const menu = Menu(weekData, selected);
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 24, width: CLIENT_WIDTH, alignSelf: 'center', marginTop: 10 }}>
                    <ScrollMenu
                        data={menu}
                        selected={selected}
                        onSelect={this.onSelect}
                        itemStyle={{ outline: 'none' }}
                    />
                </div>
            </div>
        );
    }
}