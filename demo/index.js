import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';
import { SchemaBuilder, StringType, NumberType } from '../src/utils/Schema';

class FarmerJohn extends React.Component {
    getGenderList() {
        return [
        { value: 0, text: 'male' },
        { value: 1, text: 'female' },
        { value: 2, text: 'both' },
        { value: 3, text: 'neither' }
        ];
    }

    getCountryList() {
        return [
        { value: '000', text: 'ch' },
        { value: '001', text: 'tw' },
        { value: '002', text: 'hk' },
        { value: '003', text: 'jp' },
        { value: '004', text: 'ko' },
        { value: '005', text: 'us' },
        { value: '006', text: 'fr' },
        { value: '007', text: 'uk' },
        { value: '008', text: 'ca' },
        { value: '009', text: 'au' }
        ];
    }

    render() {
        const schema = SchemaBuilder({
            username: StringType('username is unvalid').isLongerThan(6, 'username must be longer than 6 characters')
                                                       .containsLetterOnly('username must contain only letters'),
            passwd:   StringType('password is unvalid').isLongerThan(6, 'password must be longer than 6 characters')
                                                       .containsNumber('password must contain numbers')
                                                       .containsLowercaseLetter('password must contain lowercase letters')
                                                       .containsUppercaseLetter('password must contain uppercase letters'),
            bio:      StringType('bio is unvalid'),
            gender:   NumberType('gender unvalid').isOneOf([...Array(4).keys()]),
            country:  StringType('country is unvalid').isOneOf(this.getCountryList().map(o => o.value))
        });
        return (
            <Form.Form schema={schema} onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="username" type="PlainText" />
                <Form.Field name="passwd" type="Password" />
                <Form.Field name="bio" type="TextArea" placeholder="textarea placeholder"/>
                <Form.Field name="gender" type="Radios" options={this.getGenderList()} />
                <Form.Field name="country" type="DropDownList" options={this.getCountryList()} />
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
