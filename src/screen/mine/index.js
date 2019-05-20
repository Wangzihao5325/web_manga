import React, { Component } from 'react';
import './index.css';
import { redBright } from 'ansi-colors';

class Header extends Component {
    render() {
        return (
            <div style={{ height: 55, width: '100%', marginLeft: 16, display: 'flex', flexDirection: 'row' }}>
                <img style={{ height: 55, width: 55 }} src={require('../../image/mine_tab_default.png')} alt='' />
                <div style={{ flex: 1, paddingLeft: 16 }}>
                    <div style={{ color: 'white', fontSize: 17 }}>中二病</div>
                    <div style={{ color: 'white', fontSize: 13, marginTop: 5 }}>满足你所有幻想</div>
                </div>
                <div style={{ width: 44, height: 55, paddingLeft: 18, paddingTop: 19 }}>
                    <img style={{ height: 16, width: 8, alignSelf: 'center' }} src={require('../../image/mine/mine_right_arrow.png')} />
                </div>
            </div>
        );
    }
}

class Tabs extends Component {
    render() {
        return (
            <div style={{ height: 95, paddingTop: 53, width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/collect_tab_default.png')} />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>分享推广</div>
                </div>

                <div style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/collect_tab_default.png')} />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>分享推广</div>
                </div>

                <div style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/collect_tab_default.png')} />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>分享推广</div>
                </div>

                <div style={{ height: 80, width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ height: 51, width: 51 }} src={require('../../image/collect_tab_default.png')} />
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 13, marginTop: 10 }}>分享推广</div>
                </div>
            </div>
        );
    }
}

class WhiteBorder extends Component {
    render() {
        return (
            <div className='white-bord' style={{ height: 93, width: document.body.clientWidth - 24, position: 'absolute', top: 127, left: 14, backgroundColor: 'white', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                <div className='total-center'>
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 23 }}>{`136人`}</div>
                    <div style={{ color: 'rgb(193,193,193)', fontSize: 13 }}>已邀请</div>
                </div>
                <div style={{ height: 39, width: 1, backgroundColor: 'rgb(193,193,193)', alignSelf: 'center' }} />
                <div className='total-center'>
                    <div style={{ color: 'rgb(34,34,34)', fontSize: 23 }}>{`136C`}</div>
                    <div style={{ color: 'rgb(193,193,193)', fontSize: 13 }} >我的C币</div>
                </div>
            </div>
        );
    }
}

class Banner extends Component {
    render() {
        return (
            <div style={{ height: 101, width: document.body.clientWidth, backgroundColor: 'rgb(251,248,247)' }}></div>
        );
    }
}

class ListItem extends Component {
    render() {
        return (
            <div style={{ height: 53, width: document.body.clientWidth, display: 'flex' }}>
                <div style={{ height: 53, width: document.body.clientWidth - 14, display: 'flex', flexDirection: 'row', borderBottomColor: 'rgb(244,244,244)', borderBottomWidth: 1 }}>
                    <img style={{ height: 17, width: 17, marginLeft: 22 }} src={require('../../image/mine/my_write.png')} />
                    <div>绑定手机</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ height: 53, width: 53, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        {/* <img style={}/> */}
                    </div>
                </div>
            </div>
        );
    }
}

class Flatlist extends Component {
    render() {
        return (
            <ul>

            </ul>
        );
    }
}

class Mine extends Component {
    render() {
        return (
            <div style={{ flex: 1 }}>
                <WhiteBorder />
                <div className='mine-header-container' style={{ height: 135, width: '100%', paddingTop: 53 }} >
                    <Header />
                </div>
                <Tabs />
                <Banner />
            </div>
        );
    }

}

export default Mine;