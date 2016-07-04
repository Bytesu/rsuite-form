import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Field extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        labelText: React.PropTypes.string,
        helpText: React.PropTypes.string,
        onFieldChange: React.PropTypes.func
    }

    handleFieldChange(e) {
        const inputField = findDOMNode(this.refs.input);
        const value = inputField.value.trim();
        const { name, onFieldChange } = this.props;
        onFieldChange(name, value);
    }

    render() {
        const { name, type, labelText, helpText, onChange } = this.props;
        return (
            <div className="form-group">
                {labelText && <label className="control-label" for={name}> {labelText} </label>}
                <input id={name} type={type} name={name} onChange={this.handleFieldChange.bind(this)} ref="input" />
                {helpText && <span className="help-block"> {helpText} </span>}
            </div>
        );
    }
}
