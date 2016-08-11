import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Field from './Field.js';
import { Schema, SchemaModel } from 'rsuite-schema';

export default class Form extends React.Component {
    static defaultProps = {
        model: SchemaModel({}),
        horizontal: false,
        inline: false,
        errors: {}
    };

    static propTypes = {
        horizontal: React.PropTypes.bool,
        inline: React.PropTypes.bool,
        formData: React.PropTypes.object.isRequired,
        model: React.PropTypes.instanceOf(Schema).isRequired,
        onChange: React.PropTypes.func,
        errors: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.formData || {},
            errors: this.props.formData || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formData: nextProps.formData,
            errors: nextProps.errors
        });
        const { onChange } = this.props;
        onChange && onChange(nextProps.formData);
    }

    setField(fieldName, fieldValue, checkResult) {
        const fieldType = this.props.model.getFieldType(fieldName).constructor;
        const { onChange } = this.props;
        const { formData, errors } = this.state;

        if (fieldType) {
            // parse value to target type
            fieldValue = fieldType.from(fieldValue);
        }

        formData[fieldName] = fieldValue;
        errors[fieldName] = undefined;

        this.setState({
            formData, errors
        });

        onChange && onChange(formData);

        this.formCheckResult = this.formCheckResult || {}
        this.formCheckResult[fieldName] = checkResult;
    }

    getCheckResult() {
        return this.formCheckResult || {};
    }

    isValid() {
        let valid = true;
        this.setState({ errors: {} });
        for (let key in this.refs) {
            let checkResult = this.refs[key].onCheck();
            if (checkResult.hasError) {
                valid = false;
            }
        }
        return valid;
    }

    reset() {
        for (let key in this.refs) {
            this.refs[key].onReset();
        }
    }

    render() {
        const { children, model, horizontal, inline, className} = this.props;
        const { errors, formData } = this.state;

        const clesses = classNames({
            'form': true,
            'form-horizontal': horizontal,
            'form-inline': inline
        }, className);

        return (
            <form onSubmit={(e) => e.preventDefault() }  className={clesses}>
                {
                    React.Children.map(children, (child, index) => {
                        switch (child.type) {
                            case Field:
                                const { name } = child.props;
                                const value = formData[name];
                                const key = `${name}_${index}`;

                                return React.cloneElement(child, {
                                    key,
                                    value,
                                    model,
                                    ref: key,
                                    onFieldChange: this.setField.bind(this, name),
                                    error: errors[name]
                                });
                            default:
                                return child;
                        }
                    })
                }
            </form>
        );
    }
}
