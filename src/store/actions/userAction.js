import * as Types from '../actionTypes';

export function get_user_info(userData) {
    let dataObj = {
        id: userData.id,
        isLogin: true,
        userName: userData.nick_name,
        slogan: userData.description,
        mobile: userData.mobile,
        userState: userData.status,
        type: userData.type,
        invite_code: userData.invite_code,
        invite_me_code: userData.invite_me_code,
        salt: userData.salt,
        invite: userData.invite,
        coins: userData.coins,
        viewCount: userData.view_count,
        isBuy: userData.is_buy,
        token: userData.api_token
    }
    return { type: Types.GET_USER_INFO, data: dataObj };
}

export function set_invite_me_code(code) {
    return { type: Types.SET_INVITE_ME_CODE, code: code }
}

export function set_login_state(state) {
    return { type: Types.SET_LOGIN_STATE, isLogin: state }
}
