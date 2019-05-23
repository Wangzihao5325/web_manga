import * as Types from '../actionTypes';

const initialState = {
    id: -1,
    isLogin: true,//* */
    userName: '点击登陆',
    slogan: '登陆后更多精彩随你看',
    mobile: '',
    userState: '',
    type: '',
    invite_code: '',
    invite_me_code: '',
    salt: '',
    invite: 0,
    coins: 0,
    viewCount: '',
    isBuy: '',
    token: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_USER_INFO:
            return {
                ...state,
                ...action.data
            };
        case Types.SET_INVITE_ME_CODE:
            return {
                ...state,
                invite_me_code: action.code
            };
        default: return state;
    }
};
export default reducer;