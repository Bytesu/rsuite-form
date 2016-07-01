import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';

class FarmerJohn extends React.Component {
    render() {
        return (
            <Form.Form onSubmit={() => console.log('submit')}>
                <Form.Field name="username" type="text"/>
                <Form.Field name="passwd" type="password"/>
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);

