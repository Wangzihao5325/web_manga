import CryptoJS from 'crypto-js';
import { browser } from '../util/browserTest';
import { SERVICE_URL } from '../global/config';
import Variables from '../global/Variables';
import { ToastsStore } from 'react-toasts';

const IsSecurty = false;
const OriginKey = '1s1z1GYRRNZRSJam';
const SecurtyKey = CryptoJS.enc.Utf8.parse('1s1z1GYRRNZRSJam');
const PlatformStr = browser.versions.ios ? 'H-I' : 'H-A';



class api {

    getSign(paramObj) {
        let str = '';
        for (let item in paramObj) {
            let value = paramObj[item];
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
            str = `${str}${item}=${value}&`;
        }
        str = `${str}key=${OriginKey}`;
        console.log('md5');
        console.log(str);
        const hash = CryptoJS.MD5(str).toString();
        return hash.toUpperCase();
    }

    securtyFetch(url, paramObj, onSuccess, onError) {
        const sign = this.getSign(paramObj);
        let paramObjReg = { ...paramObj };
        paramObjReg.sign = sign;

        const paramObjStr = JSON.stringify(paramObjReg);
        const encryptedData = CryptoJS.AES.encrypt(paramObjStr, SecurtyKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let securtyReg = encodeURI(encryptedData.toString());

        console.log('body');
        console.log(securtyReg);

        let formData = new FormData();
        formData.append('data', securtyReg);

        this.unsecurtyFetch(url, formData, (result, code, message) => {
            //解密
            let resultDecipher = null;
            if (result) {
                let decodeUrl = decodeURIComponent(result);
                let bytes = CryptoJS.AES.decrypt(decodeUrl, SecurtyKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
                resultDecipher = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));
            }
            if (onSuccess) {
                onSuccess(resultDecipher, code, message);
            }
        }, onError);

    }

    unsecurtyFetch(url, formData, onSuccess, onError) {
        const fullUrl = `${SERVICE_URL.DomainUrl}${url}`;

        let headerDataReg = { platform: PlatformStr };
        if (Variables.account.token) {
            headerDataReg = { Authorization: `Bearer ${Variables.account.token}`, platform: PlatformStr };
        }

        const headerDataRegStr = JSON.stringify(headerDataReg);
        const encryptedData = CryptoJS.AES.encrypt(headerDataRegStr, SecurtyKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let securtyHeader = encodeURI(encryptedData.toString());
        console.log('header');
        console.log(securtyHeader);

        let header = { Accept: 'application/json', data: securtyHeader };

        let obj = { method: 'POST', headers: header, body: formData };

        fetch(fullUrl, obj).then((response) => response.json())
            .then(
                (reponseJson) => {
                    console.log('unEncode Object');
                    console.log(reponseJson);
                    const result = reponseJson.result ? reponseJson.result : null;
                    const code = (reponseJson.code || reponseJson.code === 0) ? reponseJson.code : null;
                    const message = reponseJson.message ? reponseJson.message : null;
                    try {
                        if (code === 0 || code === 200) {
                            onSuccess(result, code, message);
                        } else {
                            ToastsStore.error(message);
                        }
                    } catch (error) {
                        onError ? onError(result, code, message) : console.log(`error: socket error! ${error}`);
                    }
                }
            )

    }

    normalFetch(url, formData, onSuccess, onError) {
        const fullUrl = `${SERVICE_URL.DomainUrl}${url}`;

        let header = { Accept: 'application/json', platform: PlatformStr };

        if (Variables.account.token) {
            header = { Accept: 'application/json', platform: PlatformStr, Authorization: `Bearer ${Variables.account.token}` };
        }

        let obj = { method: 'POST', headers: header, body: formData };

        fetch(fullUrl, obj).then((response) => response.json())
            .then(
                (reponseJson) => {
                    const result = reponseJson.result ? reponseJson.result : null;
                    const code = (reponseJson.code || reponseJson.code === 0) ? reponseJson.code : 0;
                    const message = reponseJson.message ? reponseJson.message : null;
                    try {
                        if (code === 0 || code === 200) {
                            onSuccess(result, code, message);
                        } else {
                            ToastsStore.error(message);
                            console.log(message);
                            console.log(code);
                        }
                    } catch (error) {
                        onError ? onError(result, code, message) : console.log(`error: socket error! ${error}`);
                    }
                }
            )


    }

    fetchAppNotice(onSuccess, onError) {
        const url = '/api/notice';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);

    }

    sendMessage(mobile, onSuccess, onError) {
        const url = '/api/verify-code';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('mobile', mobile);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            mobile: mobile,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);

    }

    register(mobile, verification_key, code, password, password_confirmation, invite_code, onSuccess, onError) {
        const url = '/api/register';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('mobile', mobile);
            formData.append('verification_key', verification_key);
            formData.append('code', code);
            formData.append('password', password);
            formData.append('password_confirmation', password_confirmation);
            if (invite_code) {
                formData.append('invite_code', invite_code);
            }
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            code,
            mobile,
            password,
            password_confirmation,
            platform: PlatformStr,
            timestamp,
            verification_key,
        }
        if (invite_code) {
            paramObj = {
                code,
                invite_code,
                mobile,
                password,
                password_confirmation,
                platform: PlatformStr,
                timestamp,
                verification_key,
            }
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);

    }

    login(mobile, password, onSuccess, onError) {
        const url = '/api/login';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('mobile', mobile);
            formData.append('password', password);
            formData.append('type', 'P');
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            mobile,
            password,
            platform: PlatformStr,
            timestamp,
            type: 'P',
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    bindInviteMeCode(code, onSuccess, onError) {
        const url = '/api/bind-code';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            // formData.append('timestamp', timestamp);
            formData.append('code', code);

            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            code,
            platform: PlatformStr,
            timestamp,
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    getInviteRule(onSuccess, onError) {
        const url = '/api/invite-rule';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    taskList(onSuccess, onError) {
        const url = '/api/task-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    signList(onSuccess, onError) {
        const url = '/api/sign-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    inviteList(onSuccess, onError) {
        const url = '/api/invite-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    userInfo(onSuccess, onError) {
        const url = '/api/user-info';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    coinHistory(action, onSuccess, onError) {
        const url = '/api/coins-history';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('action', action);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            action,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    comicGlobal(onSuccess, onError) {
        const url = '/api/comic-global';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    viewModule(global_type, location, page, limit, onSuccess, onError) {
        const url = '/api/view-module';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('location', location);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            global_type,
            limit,
            location,
            page,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    specialList(global_type, time, page, limit, onSuccess, onError) {
        const url = '/api/special-lists';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            if (time) {
                formData.append('time', time);
            }
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            global_type,
            limit,
            page,
            platform: PlatformStr,
            timestamp
        }
        if (time) {
            paramObj = {
                global_type,
                limit,
                page,
                platform: PlatformStr,
                time: time,
                timestamp
            }
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    mangaImage(global_type, comic_id, comic_resource_id, index, page, limit, onSuccess, onError) {
        const url = '/api/comic-image';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('comic_id', comic_id);
            formData.append('comic_resource_id', comic_resource_id);
            formData.append('global_type', global_type);
            formData.append('index', index);
            formData.append('limit', limit);
            formData.append('page', page);
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            comic_resource_id,
            global_type,
            index,
            limit,
            page,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    comicInfo(global_type, comic_id, onSuccess, onError) {
        const url = '/api/comic-info';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('comic_id', comic_id);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            global_type,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    comicResource(global_type, comic_id, sort, page, limit, onSuccess, onError) {
        const url = '/api/comic-resource';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('comic_id', comic_id);
            formData.append('sort', sort);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            global_type,
            limit,
            page,
            platform: PlatformStr,
            sort,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    guessLike(global_type, comic_id, onSuccess, onError) {
        const url = '/api/guess-like';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('comic_id', comic_id);
            formData.append('global_type', global_type);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            global_type,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    mangaType(onSuccess, onError) {
        const url = '/api/comic-select';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    searchByType(global_type, comic_title, page, limit, onSuccess, onError) {
        const url = '/api/comic-lists';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('comic_title', comic_title);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_title,
            global_type,
            limit,
            page,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    mangaListByType(global_type, type_id, is_pay, state, sort, page, limit, onSuccess, onError) {
        const url = '/api/comic-lists';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('type_id', type_id);
            formData.append('is_pay', is_pay);
            formData.append('state', state);
            formData.append('sort', sort);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            global_type,
            is_pay,
            limit,
            page,
            platform: PlatformStr,
            sort,
            state,
            timestamp,
            type_id
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    mangaHistory(global_type, page, limit, onSuccess, onError) {
        const url = '/api/comic-history';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            global_type,
            limit,
            page,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    mangaCollect(global_type, page, limit, onSuccess, onError) {
        const url = '/api/collect-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            global_type,
            limit,
            page,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    deleteHistory(global_type, comic_id, onSuccess, onError) {
        const url = '/api/history-cancel';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            comic_id.forEach((item) => {
                formData.append('comic_id[]', item);
            });
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            global_type,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    addCollect(global_type, comic_id, onSuccess, onError) {
        const url = '/api/collect-add';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('comic_id', comic_id);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            global_type,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    deleteCollect(global_type, comic_id, onSuccess, onError) {
        const url = '/api/collect-cancel';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            comic_id.forEach((item) => {
                formData.append('comic_id[]', item);
            });
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            comic_id,
            global_type,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    rechargeList(onSuccess, onError) {
        const url = '/api/recharge-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    payList(onSuccess, onError) {
        const url = '/api/pay-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    orderAdd(pay_type, recharge_id, device_type, device_code, onSuccess, onError) {
        const url = '/api/pay-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    appVersion(onSuccess, onError) {//web端调取此接口只为了获取官网地址
        const url = '/api/version';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('platform', 'I');
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    feedbackKeywords(onSuccess, onError) {
        const url = '/api/feed-list';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    dailySign(onSuccess, onError) {
        const url = '/api/to-sign';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    resourceCoins(action, global_type, comic_id, comic_resource_id, index, onSuccess, onError) {
        const url = '/api/resource-buy';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('action', action);
            formData.append('index', index);
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('comic_id', comic_id);
            formData.append('comic_resource_id', comic_resource_id);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            action,
            comic_id,
            comic_resource_id,
            global_type,
            index,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    mangaRank(global_type, page, limit, onSuccess, onError) {
        const url = '/api/comic-rank';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('global_type', global_type);
            formData.append('page', page);
            formData.append('limit', limit);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            global_type,
            limit,
            page,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    taskDoneCoins(key, onSuccess, onError) {
        const url = '/api/get-coins';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('key', key);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            key,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

    taskDone(event, onSuccess, onError) {
        const url = '/api/exchange-task';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            formData.append('event', event);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            event,
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);
    }

}

export default new api();