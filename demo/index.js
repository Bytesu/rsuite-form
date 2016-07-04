import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';

class FarmerJohn extends React.Component {
    render() {
        return (
            <Form.Form onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="username" type="text"/>
                <Form.Field name="passwd" type="password"/>
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);

