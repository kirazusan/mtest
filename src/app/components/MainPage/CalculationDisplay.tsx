import React, { useState } from 'react';
import Calculator from './Calculator';

const CalculationDisplay = ({ calculationResult, errorMessage }) => {
  const [result, setResult] = useState(0);

  const toTrimmedString = (target, decimalFormat) => {
    let strValue = target.toString(decimalFormat);
    if (strValue.includes('.')) {
      strValue = strValue.replace(/0+$/, '');
    }
    if (strValue.endsWith('.')) {
      strValue = strValue.slice(0, -1);
    }
    return strValue;
  };

  const performCalculation = (value1, value2, operator) => {
    const calculatedValue = Calculator.Calculate(value1, value2, operator);
    setResult(calculatedValue);
  };

  return (
    <div>
      {calculationResult !== null && <div>{toTrimmedString(calculationResult, 10)}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default CalculationDisplay;