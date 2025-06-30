

import React, { useState } from 'react';

const CalculatorComponent = () => {
  const [doubleValue, setDoubleValue] = useState('');
  const [formatString, setFormatString] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      const doubleValueNumber = Number(doubleValue);
      if (isNaN(doubleValueNumber)) {
        throw new Error('Invalid double value');
      }

      const format = formatString.trim();
      if (!format) {
        throw new Error('Format string is required');
      }

      const formattedValue = doubleValueNumber.toLocaleString('en-US', { minimumFractionDigits: format });
      setResult(formattedValue);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResult('');
    }
  };

  return (
    <div>
      <input type="number" value={doubleValue} onChange={(e) => setDoubleValue(e.target.value)} placeholder="Double value" />
      <input type="text" value={formatString} onChange={(e) => setFormatString(e.target.value)} placeholder="Format string" />
      <button onClick={handleCalculate}>Calculate</button>
      <input type="text" value={result} readOnly />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default CalculatorComponent;