import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Field extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        onFieldChange: React.PropTypes.func,
        checkResult: React.PropTypes.object,
        value: React.PropTypes.any
    }

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
                if(React.isValidElement(child)) {
                    validChildren.push(child);
                }
            }
        );

        return validChildren;
    }

    getFieldControl() {
        let validChildren = this.getValidChildren();

        if(validChildren.length > 1) {
            console.error(`One field should always contain one field control only. Duplicate field controls will be ignored. See Field #{name}`);
        }

        if(validChildren.length < 1) {
            console.error(`No valid field control found in Field #{name}`);
            return null; // no valid child found, return null
        }

        return validChildren[0];
    }

    render() {
        const { onFieldChange, checkResult, value } = this.props;
        const fieldCtrl = this.getFieldControl();
        return (
            <div>
            {
                fieldCtrl && React.cloneElement(fieldCtrl, {
                    onChange: (v) => {
                        this.handleFieldChange(v);
                        fieldCtrl.props.onChange && fieldCtrl.props.onChange(v); // run custom onChange callback last
                    },
                    isValid: !checkResult.err,
                    errorMessage: checkResult.msg,
                    value
                })
            }
            </div>
        );
    }
}
