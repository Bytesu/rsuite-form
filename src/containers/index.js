import React from 'react';
import formReducer from '../reducers';
import FormWrapper from './FormWrapper.js';

const store = createStore(formReducer);

export default class Form extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <FormWrapper {...this.props} />
            </Provider>
        );
    }
}
