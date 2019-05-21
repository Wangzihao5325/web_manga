import * as Types from '../actionTypes';

export function pop_show(type) {
    return { type: Types.POP_SHOW, popType: type };
}

export function pop_unshow() {
    return { type: Types.POP_UNSHOW };
}

export function pop_state_change(type) {
    return { type: Types.POP_STATE_CHANGE, popType: type };
}