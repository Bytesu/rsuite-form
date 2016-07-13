import React from 'react';
import Field from './Field.js';
import { Schema } from '../utils/Schema';

export default class Form extends React.Component {
    static propTypes = {
        formData: React.PropTypes.object,
        schema:   React.PropTypes.instanceOf(Schema),
        onChange: React.PropTypes.func
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
        onChange && onChange();
    }

    setField(fieldName, fieldValue) {
        let fieldType = this.props.schema.getFieldType(fieldName).constructor;
        if(fieldType) {
            // parse value to target type
            fieldValue = fieldType.from(fieldValue);
        }

        let formData = this.state.formData;
        formData[fieldName] = fieldValue;
        this.setState({
            formData
        });
        const { onChange } = this.props;
        onChange && onChange();
    }

    render() {
        const { schema } = this.props;
        const formData = this.state.formData;

        return (
            <form onSubmit={(e) => e.preventDefault()}>
            {
                React.Children.map(
                    this.props.children,
                    child => {
                        switch(child.type) {
                            case Field:
                                const { name } = child.props;
                                const value = formData[name];
                                const checkResult = schema.checkForField(name, value);
                                const fieldHaveNotBeenEdited = value === undefined // value undefined means user haven't touched this field
                                if(fieldHaveNotBeenEdited) {
                                    // if field haven't been edited, error messages are not supposed to be shown.
                                    // set err false to hide error messages
                                    checkResult.err = false;
                                }
                                return React.cloneElement(child, {
                                    key: name,
                                    onFieldChange: this.setField.bind(this, name),
                                    value,
                                    checkResult
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
