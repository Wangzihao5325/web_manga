import * as Types from '../actionTypes';

const initialState = {
    id: -1,
    isLogin: false,
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
        default: return state;
    }
};
export default reducer;