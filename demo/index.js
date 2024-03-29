import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { Form, Field } from '../src/index.js';
import { SchemaModel, StringType } from 'rsuite-schema';

class PlainText extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        isValid: React.PropTypes.bool,
        errorMessage: React.PropTypes.string,
        value: React.PropTypes.string,
        force: React.PropTypes.bool
    };

    onInputValueChange() {
        const { onChange } = this.props;
        const input = findDOMNode(this.refs.input);
        const value = input.value;
        onChange && onChange(value);
    }

    shouldShowHelpBlock() {
        const { isValid, force, value } = this.props;
        return force || !isValid && value !== undefined;
    }

    getHelpBlock() {
        if(this.shouldShowHelpBlock()) {
            return (
                <span className="help-block"> { this.props.errorMessage } </span>
            );
        }
    }

    render() {
        const { isValid, errorMessage, value, force } = this.props;
        return (
            <div className="form-control">
                <input type="text" ref="input" onChange={this.onInputValueChange.bind(this)} value={value || ''} />
                {this.getHelpBlock()}
            </div>
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
            data: props.data || {},
            forceValidation: false
        };
    }

    getData() {
        return this.state.data;
    }

    reset() {
        this.setState({data: {}});
    }

    handleSubmit() {
        console.log(this.state.data);
        this.setState({forceValidation: true});
    }

    handleFormChange(data) {
        this.setState({ data });
    }

    render() {
        const schema = SchemaModel({
            username: StringType('username required')
                      .isLongerThan(6, 'username must longer than 6')
                      .containsLetter('username should contains one letter at least')
                      .isRequired(),
            email:    StringType('email required')
                      .isEmail('no a valid email address'),
            password: StringType('password required')
                      .isLongerThan(6, 'password must longer than 6')
                      .containsUppercaseLetter('should contain uppercase letter')
                      .containsLowercaseLetter('should contain lowercase letter')
                      .containsNumber('should contain number')
        });

        return (
            <Form
                model={schema}
                formData={this.state.data}
                onChange={this.handleFormChange.bind(this)}
                force={this.state.forceValidation}
                ref="form"
                >
                    <Field name="username"> <PlainText onChange={() => console.log('username changed')} /> </Field>
                    <Field name="email"> <PlainText onChange={() => console.log('email changed')} /> </Field>
                    <Field name="password"> <PlainText /> </Field>
                    <button onClick={this.handleSubmit.bind(this)}>submit</button>
                    <button onClick={this.reset.bind(this)}>reset</button>
            </Form>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);
