package frontend.components;

import React from 'react';
import PropTypes from 'prop-types';
import './Display.css';

const Display = ({ input, result }) => {
    return (
        <div className="display-container">
            <div className="input-display">
                <h2>Input:</h2>
                <p>{input}</p>
            </div>
            <div className="result-display">
                <h2>Result:</h2>
                <p>{result}</p>
            </div>
        </div>
    );
};

Display.propTypes = {
    input: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
};

export default Display;