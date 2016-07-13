import React from 'react';
import { render, findDOMNode } from 'react-dom';
import Rsf from '../src/index.js';
import { SchemaBuilder, StringType, NumberType } from '../src/utils/Schema';

const userModel = {
    username: 'farmer john',
    email: 'john@farmer.cow'
};

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
    static propTypes = {
        data: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            data: props.data || {...userModel}
        };
    }

    getData() {
        return this.state.data;
    }

    reset() {
        this.setState({data: {...userModel}});
    }

    render() {
        const schema = SchemaBuilder({
            data: StringType('input invalid')
        });

        return (
            <Rsf.Form schema={schema} formData={this.state.data} onChange={() => console.log('form changed')} ref="form">
                <Rsf.Field name="username"> <PlainText onChange={() => console.log('custom onChange()')} /> </Rsf.Field>
                <Rsf.Field name="email"> <PlainText onChange={() => console.log('custom onChange()')} /> </Rsf.Field>
                <button onClick={() => console.log(this.getData())}>submit</button>
                <button onClick={this.reset.bind(this)}>clear</button>
            </Rsf.Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
