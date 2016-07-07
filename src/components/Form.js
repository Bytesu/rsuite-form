import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Field from './Field.js';
import SubmitButton from './SubmitButton.js';

export default class Form extends React.Component {
    static propTypes = {
        formData: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        schema: React.PropTypes.shape({
            check: React.PropTypes.func.isRequired,
            checkForField: React.PropTypes.func.isRequired
        }),
        onSubmit: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func,
        onError: React.PropTypes.func
    };

    handleFieldChange(name, rawStringValue) {
        let fieldType = this.props.schema.getFieldType(name);
        let value = fieldType.from(rawStringValue);
    }

    render() {
        const { dispatch, formData, onSubmit, schema } = this.props;
        const bindedActions = bindActionCreators(actions, dispatch);

        return (
            <form>
            {
                React.Children.map(
                    this.props.children,
                    child => {
                        switch(child.type) {
                            case SubmitButton:
                                return React.cloneElement(child, { onClick: () => onSubmit(formData) });
                            case Field:
                                const { name } = child.props;
                                const value = formData[name];
                                const checkResult = schema.checkForField(name, value);
                                return React.cloneElement(child, {
                                    key: name,
                                    onFieldChange: (name, rawStringValue) => {
                                        let fieldType = schema.getFieldType(name);
                                        let value = fieldType.from(rawStringValue);
                                        bindActionCreators.changeFieldValue(name, value);
                                    },
                                    isValid: !checkResult.err,
                                    errMessage: checkResult.msg
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
