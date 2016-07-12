import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import * as actions from './actions';
import Form from './containers/Form.js';
import Field from './components/Field.js';

export default {
    Form: class extends React.Component {
        constructor(props) {
            super(props);
            this.store = createStore(reducer);
        }

        reset() {
            this.store.dispatch(actions.clear());
        }

        clearField(fieldName) {
            this.store.dispatch(actions.changeFieldValue(fieldName, undefined));
        }

        getData() {
            return this.store.getState()['formData'];
        }

        render() {
            return (
                <Provider store={this.store}>
                    <Form {...this.props} />
                </Provider>
            );
        }
    },
    Field
};

