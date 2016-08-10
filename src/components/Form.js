import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Field from './Field.js';
import { Schema, SchemaModel } from 'rsuite-schema';

export default class Form extends React.Component {
    static defaultProps = {
        model: SchemaModel({}),
        status: 'WAITING',
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
        status: React.PropTypes.oneOf(['WAITING', 'TYPING']),
        errors: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.formData || {},
            status: this.props.status
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formData: nextProps.formData,
            status: nextProps.status
        });
        const { onChange } = this.props;
        onChange && onChange(nextProps.formData);
    }

    setField(fieldName, fieldValue, checkResult) {
        const fieldType = this.props.model.getFieldType(fieldName).constructor;
        const { onChange } = this.props;
        const {formData} = this.state;

        if (fieldType) {
            // parse value to target type
            fieldValue = fieldType.from(fieldValue);
        }

        formData[fieldName] = fieldValue;

        this.setState({
            status: 'TYPING',
            formData
        });

        onChange && onChange(formData);

        this.formCheckResult = this.formCheckResult || {}
        this.formCheckResult[fieldName] = checkResult;
    }

    getCheckResult() {
        return this.formCheckResult || {};
    }

    isValid() {
        for (var key in this.formCheckResult) {
            if (this.formCheckResult[key].hasError) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { model, errors, horizontal, inline, className} = this.props;
        const formData = this.state.formData;

        const clesses = classNames({
            'form': true,
            'form-horizontal': horizontal,
            'form-inline': inline
        }, className);

        return (
            <form onSubmit={(e) => e.preventDefault() }  className={clesses}>
                {
                    React.Children.map(
                        this.props.children,
                        child => {
                            switch (child.type) {
                                case Field:
                                    const { name  } = child.props;
                                    const value = formData[name];

                                    return React.cloneElement(child, {
                                        key: name,
                                        onFieldChange: this.setField.bind(this, name),
                                        value,
                                        model,
                                        error: errors[name],
                                        formStatus: this.state.status
                                    });
                                default:
                                    return child;
                            }
                        }
                    )
                }
            </form>
        );
    }
}
