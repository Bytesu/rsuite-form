import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Field from './Field.js';
import { Schema } from '../utils/Schema';

export default class Form extends React.Component {
    static propTypes = {
        formData: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        schema:   React.PropTypes.instanceOf(Schema)
    };

    render() {
        const { dispatch, formData, onSubmit, schema } = this.props;
        const bindedActions = bindActionCreators(actions, dispatch);

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
                                const fieldHaveNotBeenEdited = value === undefined // value undefined means user haven't touched this field
                                const checkResult = schema.checkForField(name, value);
                                if(fieldHaveNotBeenEdited) {
                                    // if field haven't been edited, error messages are not supposed to be shown.
                                    // set err false to hide error messages
                                    checkResult.err = false;
                                }
                                return React.cloneElement(child, {
                                    key: name,
                                    onFieldChange: (name, rawValue) => {
                                        let fieldType = schema.getFieldType(name).constructor;
                                        let value = fieldType.from(rawValue);
                                        bindedActions.changeFieldValue(name, value);
                                    },
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
