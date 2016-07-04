import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Field from '../components/Field.js';
import SubmitButton from '../components/SubmitButton.js';
import * as actions from '../actions';

class FormWrapper extends React.Component {
    static propTypes = {
        formData: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
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
    };

    render() {
        const { dispatch, formData, onSubmit } = this.props;
        const bindedActions = bindActionCreators(actions, dispatch);

        return (
            <form>
            {
                React.Children.map(
                    this.props.children,
                    child => {
                        if(child.type === SubmitButton) {
                            return React.cloneElement(child, { onClick: onSubmit })
                        }
                        return child;
                    }
                )
            }
            </form>
        );
    }
}

export default connect(state => ({
    formData: state.formData
}))(FormWrapper);
