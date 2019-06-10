import React, { PureComponent } from 'react';
import store from '../store/index';
import { app_init_done } from '../store/actions/testAction';

export default class InitComponent extends PureComponent {

    componentDidMount() {
        console.log('1111111');
        setTimeout(() => {
            store.dispatch(app_init_done());
        }, 3000);

    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                init!
            </div>
        );
    }

}