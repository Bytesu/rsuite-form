import React from 'react';

export default class SubmitButton extends React.Component {
    static propTypes = {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func
    }

    render() {
        return (
            <button className="submit-button" type="button" onClick={this.props.onClick}>{this.props.text || 'submit'}</button>
        );
    }
}
