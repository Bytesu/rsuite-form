import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import { Form, Field } from '../src';

describe('Form', () => {
    it('renders without problems', () => {
        var el = TestUtils.renderIntoDocument(<Form />);
        expect(el).toExist();
    });

});
