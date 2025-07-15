package frontend.src.components;

import React from 'react';
import PropTypes from 'prop-types';
import './ResultDisplay.css';

const ResultDisplay = ({ trimmedString }) => {
    if (typeof trimmedString !== 'string') {
        return <p>Error: Invalid input. Please provide a valid string.</p>;
    }

    return (
        <div className="result-display">
            <h2>Trimmed Result:</h2>
            <p>{trimmedString}</p>
        </div>
    );
};

ResultDisplay.propTypes = {
    trimmedString: PropTypes.string.isRequired,
};

export default ResultDisplay;