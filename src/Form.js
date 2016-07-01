import React from 'react';
import Field from './Field.js';
import SubmitButton from './SubmitButton.js';

export default class Form extends React.Component {
    static propTypes = {
        schema: React.PropTypes.objectOf(
                    React.PropTypes.shape({
                        type: React.PropTypes.oneOf(['String', 'Number', 'Boolean']).isRequired,
                        defaultValue: React.PropTypes.any,
                        isRequired: React.PropTypes.bool,
                        validator: React.PropTypes.arrayOf(React.PropTypes.func)
                    })
                ),
        onSubmit: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func,
        onError: React.PropTypes.func
    }

    render() {
        return (
            <form>
            {
                React.Children.map(
                    this.props.children,
                    child => {
                        if(child.type === SubmitButton) {
                            return React.cloneElement(child, { onClick: this.props.onSubmit })
                        }
                        return child;
                    }
                )
            }
            </form>
        );
    }
}
