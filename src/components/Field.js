import React from 'react';
import { findDOMNode } from 'react-dom';
import elementType from '../utils/elementType';

const propTypes = {
    name: React.PropTypes.string.isRequired,
    onFieldChange: React.PropTypes.func,
    value: React.PropTypes.any,
    componentClass: elementType
};

class Field extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkResult: {},
            status: 'WAITING'
        };
    }

    onCheck() {
        const { name, model, value } = this.props;
        const checkResult = model.checkForField(name, value);

        this.setState({ checkResult });

        return checkResult;
    }

    onReset() {
        this.setState({ checkResult: {} });
    }

    handleFieldChange(value) {
        const { name, onFieldChange, model } = this.props;

        const fieldCtrl = this.getFieldControl();
        const { onChange: inlineOnChange  } = fieldCtrl.props;
        const checkResult = model.checkForField(name, value);

        this.setState({
            status: "TYPING",
            checkResult
        });

        onFieldChange(value, checkResult);
        inlineOnChange && inlineOnChange(value); // run custom onChange callback last

    }

    handleBlur() {
        this.setState({
            status: "WAITING"
        })
    }

    getValidChildren() {
        let validChildren = [];

        // remove child which is not react element
        React.Children.forEach(
            this.props.children,
            (child) => {
                if (React.isValidElement(child)) {
                    validChildren.push(child);
                }
            }
        );

        return validChildren;
    }

    getFieldControl() {
        let validChildren = this.getValidChildren();

        if (validChildren.length > 1) {
            console.error(`One field should always contain one field control only. Duplicate field controls will be ignored. See Field #{name}`);
        }

        if (validChildren.length < 1) {
            console.error(`No valid field control found in Field #{name}`);
            return null; // no valid child found, return null
        }

        return validChildren[0];
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.error && this.state.status === 'WAITING') {
            this.setState({
                checkResult: {
                    hasError: true,
                    errorMessage: nextProps.error
                }
            })
        }
    }

    render() {
        const {value, error, componentClass: Component, ...props} = this.props;
        const fieldCtrl = this.getFieldControl();
        const { onChange: inlineOnChange  } = fieldCtrl.props;
        const checkResult = this.state.checkResult;

        const child = fieldCtrl ? React.cloneElement(fieldCtrl, {
            onChange: this.handleFieldChange.bind(this),
            onBlur: this.handleBlur.bind(this),
            errorMessage: checkResult.errorMessage,
            isValid: checkResult.hasError === undefined ? undefined : !checkResult.hasError,
            value
        }) : null;

        return Component ? <Component {...props} > {child}</Component> : child
    }
}

Field.propTypes = propTypes;

export default Field;
