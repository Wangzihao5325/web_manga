import * as Types from '../actionTypes';

export function tab_navi_show() {
    return { type: Types.TAB_BOTTOM_NAVI_SHOW };
}

export function tab_navi_unshow() {
    return { type: Types.TAB_BOTTOM_NAVI_UNSHOW };
}

export function tab_navi_select_change(index) {
    return { type: Types.TAB_BOTTOM_NAVI_SELECT_CHANGE, index: index }
}