

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MathOperatorButton = () => {
  const [mathOperator, setMathOperator] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMathOperator = async () => {
      try {
        const response = await axios.get('/api/math-operator');
        if (response.data) {
          setMathOperator(response.data);
        } else {
          setError('Invalid response data');
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMathOperator();
  }, []);

  const onClick = async () => {
    try {
      const response = await axios.get('/api/math-operator');
      if (response.data) {
        setMathOperator(response.data);
      } else {
        setError('Invalid response data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <button onClick={onClick}>
      {mathOperator || 'Click to get math operator'}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </button>
  );
};

export default MathOperatorButton;