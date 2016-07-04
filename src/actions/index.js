import * as types from '../constants/actionTypes.js';

export function submitForm(data) {
    return {
        type: types.SUBMIT_FORM,
        data
    };
}

export function changeFieldValue(fieldName, fieldValue) {
    return {
        type: types.CHANGE_FIELD_VALUE,
        fieldName,
        fieldValue
    };
}
