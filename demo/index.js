import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';

class FarmerJohn extends React.Component {
    render() {
        return (
            <Form.Form onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="username" type="PlainText"/>
                <Form.Field name="passwd" type="Password"/>
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);

