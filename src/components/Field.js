import React from 'react';
import { findDOMNode } from 'react-dom';
import * as FieldControls from './FieldControls';

export default class Field extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        labelText: React.PropTypes.string,
        onFieldChange: React.PropTypes.func,
        isValid: React.PropTypes.bool,
        errMessage: React.PropTypes.string
    }

    getLabel(labelText) {
        return (
            <label className="control-label" for={this.props.name}> {labelText || ""} </label>
        );
    }

    getHelpBlock(helpText) {
        return (
            <span className="help-block"> {helpText || ""} </span>
        );
    }

    handleFieldChange(e) {
        const inputField = e.target;
        const value = inputField.value.trim();
        const { name, onFieldChange } = this.props;
        onFieldChange(name, value);
    }

    render() {
        const { name, type, labelText, onFieldChange, isValid, errMessage, ...fieldControlProps } = this.props;
        const FieldControl = FieldControls[type];
        return (
            <div className="form-group">
                {labelText && this.getLabel(labelText)}
                <FieldControl
                    id={name}
                    name={name}
                    onChange={this.handleFieldChange.bind(this)}
                    ref="FieldControl"
                    {...fieldControlProps}
                />
                {!isValid && this.getHelpBlock(errMessage)}
            </div>
        );
    }
}
