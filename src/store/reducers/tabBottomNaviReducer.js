import * as Types from '../actionTypes';

const initialState = {
    isShow: true,
    highlightIndex: 0
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
        case Types.TAB_BOTTOM_NAVI_SELECT_CHANGE:
            return {
                ...state,
                highlightIndex: action.index
            };
        default: return state;
    }
};
export default reducer;