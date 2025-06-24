

import React from 'react';
import { useDispatch } from 'react-redux';
import { resetCalculationState } from '../actions/calculationActions';

const CalculatorClearButton = ({ calculationState, setResultText }) => {
  const dispatch = useDispatch();

  const handleClear = () => {
    try {
      dispatch(resetCalculationState());
      setResultText('0');
    } catch (error) {
      console.error('Error clearing calculation state:', error);
    }
  };

  if (!calculationState) {
    throw new Error('calculationState prop is required');
  }

  return (
    <button onClick={handleClear}>Clear</button>
  );
};

export default CalculatorClearButton;