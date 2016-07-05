import React from 'react';

export default class TextArea extends React.Component {
    render() {
        return (
            <textarea {...this.props}></textarea>
        );
    }
}
