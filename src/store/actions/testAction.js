import * as Types from '../actionTypes';

export function test_add() {
    return { type: Types.TEST_INCREMENT };
}

export function test_min() {
    return { type: Types.TEST_DECREMENT };
}

export function clear_location_storage(){
    return { type: Types.CLEAR_LOCAL_STORAGE };
}