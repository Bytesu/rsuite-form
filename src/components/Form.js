import React from 'react';
import ReactDOM from 'react-dom';
import Field from './Field.js';
import { Schema, SchemaModel } from 'rsuite-schema';

export default class Form extends React.Component {
    static defaultProps = {
        model: SchemaModel({}),
        force: false
    };

    static propTypes = {
        formData: React.PropTypes.object.isRequired,
        model: React.PropTypes.instanceOf(Schema).isRequired,
        onChange: React.PropTypes.func,
        force: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.formData || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formData: nextProps.formData
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
        return this.formCheckResult;
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
        const { model, force: globalForce } = this.props;
        const formData = this.state.formData;

        return (
            <form onSubmit={(e) => e.preventDefault() }>
                {
                    React.Children.map(
                        this.props.children,
                        child => {
                            switch (child.type) {
                                case Field:
                                    const { name, force: localForce } = child.props;
                                    const value = formData[name];
                                    const checkResult = model.checkForField(name, value);

                                    this.setCheckResult(name, checkResult);

                                    const force = localForce !== undefined ? localForce : globalForce;
                                    return React.cloneElement(child, {
                                        key: name,
                                        onFieldChange: this.setField.bind(this, name),
                                        value,
                                        checkResult,
                                        force
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
