import * as Types from '../actionTypes';

const initialState = {
    isAutoBuy: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.READ_AUTO_BUY_TRUE:
            return {
                ...state,
                isAutoBuy: true
            };
        case Types.READ_AUTO_BUY_FALSE:
            return {
                ...state,
                isAutoBuy: false
            };
        case Types.READ_AUTO_BUY_CHANGE:
            return {
                ...state,
                isAutoBuy: !state.isAutoBuy
            };
        default: return state;
    }
};
export default reducer;