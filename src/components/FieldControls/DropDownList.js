import React from 'react';

export default class DropDownList extends React.Component {
    static propTypes = {
        options: React.PropTypes.arrayOf(
                     React.PropTypes.shape({
                         value: React.PropTypes.any,
                         text: React.PropTypes.string
                     })
                 )
    };

    render() {
        const { options, ...otherProps } = this.props;
        return (
            <select {...otherProps}>
                {
                    options.map( (op, idx) => <option key={idx} value={op.value} dangerouslySetInnerHTML={{__html: op.text}}></option> )
                }
            </select>
        );
    }
}
