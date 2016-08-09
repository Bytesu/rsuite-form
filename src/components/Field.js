import React from 'react';
import { findDOMNode } from 'react-dom';
import debounce from '../utils/debounce'

export default class Field extends React.Component {
    static defaultProps = {
        checkResult: { hasError: false }
    };

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        onFieldChange: React.PropTypes.func,
        checkResult: React.PropTypes.shape({
            hasError: React.PropTypes.bool,
            errorMessage: React.PropTypes.string
        }),
        value: React.PropTypes.any,
        force: React.PropTypes.bool
    };

    handleFieldChange(v) {
        const { name, onFieldChange } = this.props;
        onFieldChange(name, v);
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

    render() {
        const { onFieldChange, checkResult, value, force: localForce } = this.props;
        const fieldCtrl = this.getFieldControl();
        const { onChange: inlineOnChange, force: inlineForce } = fieldCtrl.props;
        const isValid = !checkResult.hasError;
        const errorMessage = checkResult.errorMessage;
        const force = inlineForce !== undefined ? inlineForce : localForce;
        return (
            <div>
                {
                    fieldCtrl && React.cloneElement(fieldCtrl, {
                        onChange: debounce((value) => {
                            onFieldChange(value);
                            inlineOnChange && inlineOnChange(value); // run custom onChange callback last
                        }, 500),
                        isValid,
                        errorMessage,
                        value,
                        force
                    })
                }
            </div>
        );
    }
}



