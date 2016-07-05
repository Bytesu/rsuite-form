import React from 'react';

export default class PlainText extends React.Component {
    render() {
        return (
            <input type="text" {...this.props} />
        );
    }
}
