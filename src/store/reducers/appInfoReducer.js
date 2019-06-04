import * as Types from '../actionTypes';

const initialState = {
    offical_url: '',
    share_url: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_APP_INFO_URL:
            return {
                ...state,
                offical_url: action.offical,
                share_url: action.share,
            };
        default: return state;
    }
};
export default reducer;