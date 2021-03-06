import React, { PureComponent } from 'react';
import { SERVICE_URL } from '../global/config';
import Variables from '../global/Variables';
import store from '../store/index';
import { app_init_done } from '../store/actions/testAction';
import { get_user_info } from '../store/actions/userAction';
import Api from '../socket/index';
import { add_app_info_url } from '../store/actions/appInfoAction';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../global/sizes';

const channel = [
    'http://channel.gkj1.me',
    'http://channel.gunkoj.me',
    'http://channel.gokoju.me',
    'http://channel.gkman.me',
    'http://channel.ko3.me',
    'http://channel.gkoj.me',
];

export default class InitComponent extends PureComponent {

    componentDidMount() {//ping.test

        let pArr = channel.map((item) => {
            return new Promise((resolve, reject) => {
                let url = `${item}/ping.txt`;
                fetch(url, { method: 'get', mode: 'cors' }).then((reponse) => {
                    if (reponse.status === 200) {
                        return resolve(item);
                    }
                })
            });
        });

        const p = Promise.race(pArr);

        p.then((e) => {
            SERVICE_URL.DomainUrl = e;
            if (window.localStorage.erokun_token) {
                let token = window.localStorage.erokun_token;
                Variables.account.token = token;
                Api.userInfo((e) => {
                    store.dispatch(get_user_info(e));
                });
            }
            Api.appVersion((e) => {
                store.dispatch(add_app_info_url(e.official_url, e.share_url, e.potato_invite_link, e.share_text, e.lose));
            });
            setTimeout(() => {
                store.dispatch(app_init_done());
            }, 2000);
        })
    }

    render() {
        const leftSize = (CLIENT_WIDTH - 245) / 2;
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }} >
                <div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', display: 'flex', position: 'absolute', top: 250, left: leftSize, height: 160, width: 245, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 5 }}>
                    <div style={{ height: 56, width: 49 }}><img style={{ height: 56, width: 49 }} src={require('../image/usual/anime.png')} alt='' /></div>
                    <div style={{ fontSize: 18, color: 'white', marginTop: 20 }}>正在选择最优线路...</div>
                </div>
                <img style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH }} src={require('../image/usual/chanel_select.png')} alt='' />
            </div>
        );
    }

}