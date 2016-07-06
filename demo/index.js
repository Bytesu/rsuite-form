import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';
import { SchemaBuilder, StringType } from '../src/utils/Schema';

class FarmerJohn extends React.Component {
    render() {
        const schema = SchemaBuilder({
            username: StringType().isLongerThan(6)
                                  .containsLetterOnly(),
            passwd:   StringType().isLongerThan(6)
                                  .containsNumber()
                                  .containsLowercaseLetter()
                                  .containsUppercaseLetter(),
            bio:      StringType()
        });
        return (
            <Form.Form schema={schema} onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="username" type="PlainText" helpText="username helptext"/>
                <Form.Field name="passwd" type="Password" helpText="password helptext"/>
                <Form.Field name="bio" type="TextArea" helpText="textarea helptext" placeholder="textarea placeholder"/>
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
