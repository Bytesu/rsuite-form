import * as types from '../constants/actionTypes.js';

export function changeFieldValue(fieldName, fieldValue) {
    return {
        type: types.CHANGE_FIELD_VALUE,
        fieldName,
        fieldValue
    };
}

export function clear() {
    return {
        type: types.CLEAR
    };
}

