import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Form from './containers/Form.js';
import Field from './components/Field.js';

const store = createStore(reducer);

export default {
    Form: (props) => <Provider store={store}><Form {...props} /></Provider>,
    Field,
};
