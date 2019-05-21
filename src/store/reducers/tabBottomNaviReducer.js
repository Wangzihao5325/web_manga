import * as Types from '../actionTypes';

const initialState = {
    isShow: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.TAB_BOTTOM_NAVI_SHOW:
            return {
                ...state,
                isShow: true
            };
        case Types.TAB_BOTTOM_NAVI_UNSHOW:
            return {
                ...state,
                isShow: false
            };
        default: return state;
    }
};
export default reducer;