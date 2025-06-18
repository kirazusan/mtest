

import { useState } from 'react';

const mathOperators = ['+', '-', '*', '/'];

const updateMathOperator = (mathOperator, setMathOperator) => {
    if (!mathOperators.includes(mathOperator)) {
        throw new Error(`Invalid math operator: ${mathOperator}`);
    }
    try {
        setMathOperator(mathOperator);
    } catch (error) {
        console.error('Error updating math operator:', error);
    }
};

export default updateMathOperator;