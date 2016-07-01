import React from 'react';

export default class Field extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        labelText: React.PropTypes.string,
        helpText: React.PropTypes.string
    }

    render() {
        const { name, type, labelText, helpText } = this.props;
        return (
            <div className="form-group">
                {labelText && <label className="control-label" for={name}> {labelText} </label>}
                <input id={name} type={type} name={name} />
                {helpText && <span className="help-block"> {helpText} </span>}
            </div>
        );
    }
}
