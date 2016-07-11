import React from 'react';
import { render, findDOMNode } from 'react-dom';
import Form from '../src/index.js';
import { SchemaBuilder, StringType, NumberType } from '../src/utils/Schema';

class PlainText extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    };

    onInputValueChange() {
        const { onChange } = this.props;
        const input = findDOMNode(this.refs.input);
        const value = input.value;
        onChange && onChange(value);
    }

    render() {
        return (
            <input type="text" ref="input" onChange={this.onInputValueChange.bind(this)}/>
        );
    }
}

class FarmerJohn extends React.Component {
    render() {
        const schema = SchemaBuilder({
            data: StringType('input unvalid')
        });
        return (
            <Form.Form schema={schema} onSubmit={(formData) => console.log(formData)}>
                <Form.Field name="data"> <PlainText onChange={() => console.log('custom onChange()')}/> </Form.Field>
                <Form.SubmitButton text="click to submit" />
            </Form.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
