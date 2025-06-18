

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CalculatorButton = ({ number, onSelectNumber, onSelectOperator, currentNumber, currentState, mathOperator }) => {
    const [currentNumberState, setCurrentNumberState] = React.useState(currentNumber);
    const [currentStateState, setCurrentStateState] = React.useState(currentState);
    const [mathOperatorState, setMathOperatorState] = React.useState(mathOperator);
    const buttonRef = React.createRef();
    const resultTextRef = React.createRef();

    React.useEffect(() => {
        if (typeof onSelectNumber !== 'function') {
            throw new Error('onSelectNumber prop must be a function');
        }
        if (typeof onSelectOperator !== 'function') {
            throw new Error('onSelectOperator prop must be a function');
        }
        if (typeof number !== 'number') {
            throw new Error('number prop must be a number');
        }
    }, [onSelectNumber, onSelectOperator, number]);

    const handleClick = () => {
        onSelectNumber(number);
        onSelectOperator();
        setCurrentStateState(-2);
        const textValue = buttonRef.current.textContent;
        setMathOperatorState(textValue);
        const currentValue = resultTextRef.current.textContent;
    };

    return (
        <div>
            <button ref={buttonRef} onClick={handleClick}>
                {number}
            </button>
            <div ref={resultTextRef} id="result-text" />
        </div>
    );
};

CalculatorButton.propTypes = {
    number: PropTypes.number.isRequired,
    onSelectNumber: PropTypes.func.isRequired,
    onSelectOperator: PropTypes.func.isRequired,
    currentNumber: PropTypes.number,
    currentState: PropTypes.number,
    mathOperator: PropTypes.string
};

export default CalculatorButton;