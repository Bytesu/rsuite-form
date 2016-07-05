import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';

class FarmerJohn extends React.Component {
    render() {
        const schema = {
            username: {
                          validators: [
                              // username should at least 6 characters long and contain only letter
                              Form.validators.isString,
                              Form.validators.isLongerThan(6),
                              Form.validators.containsLetterOnly
                          ]
                      },
            passwd:   {
                          validators: [
                              // password should at least 6 characters long and contain number, uppercase letter and lowercase letter
                              Form.validators.isString,
                              Form.validators.isLongerThan(6),
                              Form.validators.containsNumber,
                              Form.validators.containsLowercaseLetter,
                              Form.validators.containsUppercaseLetter
                          ]
                      }
        };

        return (
            <Form.Form schema={schema} onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="username" type="PlainText" helpText="username helptext"/>
                <Form.Field name="passwd" type="Password" helpText="password helptext"/>
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);

