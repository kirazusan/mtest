

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OperatorButton = ({ operator, onSelectOperator }) => {
    const [currentOperator, setCurrentOperator] = useState(operator);

    useEffect(() => {
        setCurrentOperator(operator);
    }, [operator]);

    const handleOnClick = () => {
        if (typeof onSelectOperator === 'function') {
            onSelectOperator(currentOperator);
        }
    };

    return (
        <button
            type="button"
            onClick={handleOnClick}
            aria-label={currentOperator}
            disabled={!currentOperator}
        >
            {currentOperator}
        </button>
    );
};

OperatorButton.propTypes = {
    operator: PropTypes.string,
    onSelectOperator: PropTypes.func,
};

OperatorButton.defaultProps = {
    onSelectOperator: () => {},
};

export default OperatorButton;