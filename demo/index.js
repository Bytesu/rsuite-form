import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';
import { SchemaBuilder, StringType } from '../src/utils/Schema';

class FarmerJohn extends React.Component {
    render() {
        const schema = SchemaBuilder({
            username: StringType('username is unvalid').isLongerThan(6, 'username must be longer than 6 characters')
                                                       .containsLetterOnly('username must contain only letters'),
            passwd:   StringType('password is unvalid').isLongerThan(6, 'password must be longer than 6 characters')
                                                       .containsNumber('password must contain numbers')
                                                       .containsLowercaseLetter('password must contain lowercase letters')
                                                       .containsUppercaseLetter('password must contain uppercase letters'),
            bio:      StringType('bio is unvalid')
        });
        return (
            <Form.Form schema={schema} onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="username" type="PlainText" />
                <Form.Field name="passwd" type="Password" />
                <Form.Field name="bio" type="TextArea" placeholder="textarea placeholder"/>
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
