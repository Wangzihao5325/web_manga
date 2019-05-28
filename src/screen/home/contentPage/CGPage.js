import React, { Component } from 'react';
import Api from '../../../socket/index';

export default class CGPage extends Component {

    componentDidMount() {
        Api.specialList(this.props.type, null, 1, 10, (e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div></div>
        );
    }
}