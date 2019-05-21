import * as Types from '../actionTypes';

const initialState = {
    popShow: false,
    popType: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.POP_SHOW:
            return {
                ...state,
                popShow: true,
                popType: action.popType,
            };
        case Types.POP_UNSHOW:
            return {
                ...state,
                popShow: false,
                popType: '',
            };
        case Types.POP_STATE_CHANGE:
            if (state.popShow) {
                return {
                    popShow: false,
                    popType: '',
                }
            } else {
                return {
                    ...state,
                    popShow: true,
                    popType: action.popType,
                };
            }
        default: return state;
    }
};
export default reducer;