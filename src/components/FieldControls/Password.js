import React from 'react';

export default class Password extends React.Component {
    render() {
        return (
            <input type="password" {...this.props} />
        );
    }
}
