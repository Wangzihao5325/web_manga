import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { CLIENT_WIDTH } from '../../global/sizes';

class NotFoundPage extends PureComponent {

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <div style={{ marginTop: 100, width: CLIENT_WIDTH, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: 199, width: 235 }}><img style={{ height: 199, width: 235 }} src={require('../../image/collect/no_collect_data.png')} alt='' /></div>
                    <div onClick={this.goBack} style={{ color: 'rgb(160,160,160)', fontSize: 16, marginTop: 50 }}>找不到页面～～(404)</div>
                    <div onClick={this.goBack} style={{ color: 'rgb(160,160,160)', fontSize: 16, marginTop: 10 }}>点击跳转至首页</div>
                </div>
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/');
    }

}

const NotFoundPageWithRouter = withRouter(NotFoundPage);
export default NotFoundPageWithRouter;