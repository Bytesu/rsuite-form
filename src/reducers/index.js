import * as types from '../constants/actionTypes.js';

const initialState = {
    formData: {}
};

export default function formReducer(state = initialState, action) {
    switch(action.type) {
        case types.SUBMIT_FORM:
            return {
                formData: action.data
            };
        default:
            return state;
    }
}
