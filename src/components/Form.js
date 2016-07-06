import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Field from './Field.js';
import SubmitButton from './SubmitButton.js';

export default class Form extends React.Component {
    static propTypes = {
        formData: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        schema: React.PropTypes.objectOf(
                    React.PropTypes.shape({
                        validators: React.PropTypes.arrayOf(React.PropTypes.func),
                        defaultValue: React.PropTypes.any
                    })
                ).isRequired,
        onSubmit: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func,
        onError: React.PropTypes.func
    };

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
                                return React.cloneElement(child, {
                                    key: child.props.name,
                                    onFieldChange: bindedActions.changeFieldValue,
                                    value: formData[child.props.name] || null,
                                    schema: schema[child.props.name] || null
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
