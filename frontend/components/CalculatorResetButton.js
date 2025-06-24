

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetCalculatorState } from '../actions/calculatorActions';
import { calculatorReducer } from '../reducers/calculatorReducer';

const CalculatorResetButton = () => {
  const dispatch = useDispatch();
  const [calculatorState, setCalculatorState] = useState({
    firstNumber: 0,
    secondNumber: 0,
    currentState: 'initial',
    decimalFormat: '0.00',
    resultText: '0',
    currentEntry: ''
  });

  const handleReset = () => {
    dispatch(resetCalculatorState());
    setCalculatorState({
      ...calculatorState,
      firstNumber: 0,
      secondNumber: 0,
      currentState: 'initial',
      decimalFormat: '0.00',
      resultText: '0',
      currentEntry: ''
    });
  };

  return (
    <button onClick={handleReset}>Reset</button>
  );
};

export default CalculatorResetButton;