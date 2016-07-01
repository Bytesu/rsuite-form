import React from 'react';
import { render } from 'react-dom';
import Form from '../src/index.js';

class FarmerJohn extends React.Component {
    render() {
        return (
            <div>Demo</div>
        );
    }
}

render(
    <FarmerJohn />,
    document.getElementById('render-target')
);

