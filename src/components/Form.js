import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Field from './Field.js';
import debounce from '../utils/debounce.js';
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

    setField(fieldName, fieldValue) {
        const fieldType = this.props.model.getFieldType(fieldName).constructor;
        if (fieldType) {
            // parse value to target type
            fieldValue = fieldType.from(fieldValue);
        }
        const {formData} = this.state;

        formData[fieldName] = fieldValue;

        this.setState({
            formData
        });
        const { onChange } = this.props;
        onChange && onChange(formData);
    }
    setCheckResult(name, checkResult) {
        this.formCheckResult = this.formCheckResult || {}
        this.formCheckResult[name] = checkResult;
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
            'form': true ,
            'form-horizontal':horizontal,
            'form-inline':inline
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

                                    debounce(() => {
                                        const checkResult = model.checkForField(name, value);
                                        this.setCheckResult(name, checkResult);
                                    }, 500)();

                                    let checkResult = this.getCheckResult()[name] || {};

                                    if (errors[name]) {
                                        checkResult = {
                                            hasError: true,
                                            errorMessage: errors[name]
                                        }
                                    }

                                    return React.cloneElement(child, {
                                        key: name,
                                        onFieldChange: this.setField.bind(this, name),
                                        value,
                                        checkResult,
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
