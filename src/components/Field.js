import React from 'react';
import { findDOMNode } from 'react-dom';
import * as FieldControls from './FieldControls';

export default class Field extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        labelText: React.PropTypes.string,
        helpText: React.PropTypes.string,
        onFieldChange: React.PropTypes.func,
        value: React.PropTypes.any,
        schema: React.PropTypes.object
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
        const inputField = findDOMNode(this.refs.FieldControl);
        const value = inputField.value.trim();
        const { name, onFieldChange } = this.props;
        onFieldChange(name, value);
    }

    isFieldValid() {
        const { value, schema } = this.props;
        const validators = schema.validators || [];
        for(let i = 0, len = validators.length; i < len; i++) {
            if(!validators[i](value)) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { name, type, labelText, helpText, onChange } = this.props;
        const FieldControl = FieldControls[type];
        return (
            <div className="form-group">
                {labelText && this.getLabel(labelText)}
                <FieldControl id={name} name={name} onChange={this.handleFieldChange.bind(this)} ref="FieldControl" />
                {helpText && !this.isFieldValid() && this.getHelpBlock(helpText)}
            </div>
        );
    }
}
