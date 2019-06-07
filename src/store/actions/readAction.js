import * as Types from '../actionTypes';

export function auto_buy_true() {
    return { type: Types.READ_AUTO_BUY_TRUE };
}

export function auto_buy_false() {
    return { type: Types.READ_AUTO_BUY_FALSE };
}

export function auto_buy_change() {
    return { type: Types.READ_AUTO_BUY_CHANGE };
}