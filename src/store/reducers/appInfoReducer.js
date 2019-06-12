import * as Types from '../actionTypes';

const initialState = {
    offical_url: '',
    share_url: '',
    potato_url: '',
    share_text: '',
    isLost: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_APP_INFO_URL:
            return {
                ...state,
                offical_url: action.offical,
                share_url: action.share,
                potato_url: action.potato,
                share_text: action.shareText,
                isLost: action.isLost ? true : false,
            };
        case Types.CLEAR_LOCAL_STORAGE:
            return {
                ...initialState
            };
        default: return state;
    }
};
export default reducer;