import * as Types from '../actionTypes';

const initialState = {
    isAppInit: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.APP_INIT_DONE:
            return {
                ...state,
                isAppInit: true
            };
        default: return state;
    }
};
export default reducer;