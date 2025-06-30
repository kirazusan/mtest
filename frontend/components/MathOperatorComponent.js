

import React, { useState, useEffect } from 'react';

const MathOperatorComponent = ({ operatorValue }) => {
  const [currentOperator, setCurrentOperator] = useState('');
  const [error, setError] = useState(null);

  const updateMathOperator = (operator) => {
    try {
      setCurrentOperator(operator);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    updateMathOperator(operatorValue);
  }, [operatorValue]);

  return (
    <div>
      <button onClick={() => updateMathOperator(operatorValue)}>
        Update Math Operator
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Current Operator: {currentOperator}</p>
    </div>
  );
};

export default MathOperatorComponent;