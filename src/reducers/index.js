import * as types from '../constants/actionTypes.js';

const initialState = {
    formData: {}
};

export default function formReducer(state = initialState, action) {
    switch(action.type) {
        case types.CHANGE_FIELD_VALUE:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.fieldName]: action.fieldValue
                }
            };
        case types.CLEAR:
            return {
                ...state,
                formData: {}
            };
        default:
            return state;
    }
}
