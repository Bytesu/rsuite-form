import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import { Form, Field } from '../src';

describe('Field', () => {
    it('renders without problems', () => {
        var el = TestUtils.renderIntoDocument(
            <Field name='field' checkResult={{err: false}}>
                <input type="text" />
            </Field>
        );
        expect(el).toExist();
    });
});
