

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalculatorComponent = () => {
  const [currentState, setCurrentState] = useState({});
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [mathematicalOperator, setMathematicalOperator] = useState('');
  const [currentCalculation, setCurrentCalculation] = useState('');
  const [error, setError] = useState(null);

  const calculatorService = {
    updateCurrentState: async (firstNumber, secondNumber, mathematicalOperator) => {
      try {
        const response = await axios.post('/api/UpdateCalculatorState', {
          firstNumber,
          secondNumber,
          mathematicalOperator,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  };

  const handleUpdateCurrentState = async () => {
    if (!mathematicalOperator) {
      setError('Please select a mathematical operator');
      return;
    }

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      setError('Please enter valid numbers');
      return;
    }

    try {
      const response = await calculatorService.updateCurrentState(
        firstNumber,
        secondNumber,
        mathematicalOperator
      );
      setCurrentState(response);
      setCurrentCalculation(response.currentCalculation);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'firstNumber':
        setFirstNumber(value);
        break;
      case 'secondNumber':
        setSecondNumber(value);
        break;
      case 'mathematicalOperator':
        setMathematicalOperator(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleUpdateCurrentState();
  }, [firstNumber, secondNumber, mathematicalOperator]);

  return (
    <div>
      <input
        type="number"
        name="firstNumber"
        value={firstNumber}
        onChange={handleInputChange}
        placeholder="First Number"
      />
      <select
        name="mathematicalOperator"
        value={mathematicalOperator}
        onChange={handleInputChange}
      >
        <option value="">Select Operator</option>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>
      <input
        type="number"
        name="secondNumber"
        value={secondNumber}
        onChange={handleInputChange}
        placeholder="Second Number"
      />
      <button onClick={handleUpdateCurrentState}>Calculate</button>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Result: {currentCalculation}</p>
      )}
    </div>
  );
};

export default CalculatorComponent;