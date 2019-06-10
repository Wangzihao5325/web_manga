import * as Types from '../actionTypes';

export function clear_location_storage() {
    return { type: Types.CLEAR_LOCAL_STORAGE };
}

export function app_init_done() {
    return { type: Types.APP_INIT_DONE };
}