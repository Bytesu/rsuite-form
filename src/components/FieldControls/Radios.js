import React from 'react';

export default class Radios extends React.Component {
    static propTypes = {
        options: React.PropTypes.arrayOf(
                     React.PropTypes.shape({
                         value: React.PropTypes.any,
                         text: React.PropTypes.string
                     })
                 )
    };

    render() {
        const { options } = this.props;
        return (
            <div className="radios-group">
            {
                options.map( (op, idx) =>
                    <div className="radio" key={idx}>
                        <input type="radio" value={op.value} {...this.props} />
                        <label className="radio-label" dangerouslySetInnerHTML={{__html: op.text}}></label>
                    </div>
                )
            }
            </div>
        );
    }
}
