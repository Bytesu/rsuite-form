import * as types from '../constants/actionTypes.js';

export function submitForm(data) {
    return {
        type: types.SUBMIT_FORM,
        data
    };
}

export function changeFieldValue(value) {
    return {
        type: types.CHANGE_FIELD_VALUE,
        value
    };
}
