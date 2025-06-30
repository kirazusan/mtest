

import React, { useState } from 'react';
import axios from 'axios';

const DoubleExtensionsComponent = () => {
  const [doubleValue, setDoubleValue] = useState('');
  const [decimalFormat, setDecimalFormat] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleConvert = () => {
    if (!doubleValue || !decimalFormat) {
      setError('Please enter both double value and decimal format');
      return;
    }

    const isValidDoubleValue = !isNaN(parseFloat(doubleValue));
    const isValidDecimalFormat = !isNaN(parseInt(decimalFormat));

    if (!isValidDoubleValue || !isValidDecimalFormat) {
      setError('Invalid input values');
      return;
    }

    axios.get(`http://localhost:8080/convert?doubleValue=${doubleValue}&decimalFormat=${decimalFormat}`)
      .then(response => {
        setResult(response.data);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div>
      <input type="text" value={doubleValue} onChange={(e) => setDoubleValue(e.target.value)} placeholder="Double Value" />
      <input type="text" value={decimalFormat} onChange={(e) => setDecimalFormat(e.target.value)} placeholder="Decimal Format" />
      <button onClick={handleConvert}>Convert</button>
      <input type="text" value={result} readOnly />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DoubleExtensionsComponent;