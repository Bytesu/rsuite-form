import React from 'react';
import { render, findDOMNode } from 'react-dom';
import Rsf from '../src/index.js';
import { SchemaBuilder, StringType, NumberType } from '../src/utils/Schema';

class PlainText extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        value: React.PropTypes.string
    };

    onInputValueChange() {
        const { onChange } = this.props;
        const input = findDOMNode(this.refs.input);
        const value = input.value;
        onChange && onChange(value);
    }

    render() {
        return (
            <input type="text" ref="input" onChange={this.onInputValueChange.bind(this)} value={this.props.value || ''}/>
        );
    }
}

class FarmerJohn extends React.Component {
    render() {
        const schema = SchemaBuilder({
            data: StringType('input invalid')
        });
        return (
            <Rsf.Form schema={schema} ref="form">
                <Rsf.Field name="data"> <PlainText onChange={() => console.log('custom onChange()')} /> </Rsf.Field>
                <button onClick={() => console.log(this.refs.form.getData())}>submit</button>
                <button onClick={() => {
                    this.refs.form.reset();
                }}>clear</button>
            </Rsf.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
