import React, { useState, useEffect } from 'react';
import AppService from '/src/app/services/AppService.js';

const MainPage = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [availableFonts, setAvailableFonts] = useState([]);
  const [supportedOperations, setSupportedOperations] = useState([]);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [loadingFonts, setLoadingFonts] = useState(true);
  const [loadingOperations, setLoadingOperations] = useState(true);

  const handleCalculate = () => {
    if (!operator) {
      setError('Please select an operator.');
      return;
    }
    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers.');
      return;
    }
    AppService.calculate(num1, num2, operator)
      .then(response => {
        setResult(response.result);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setResult(null);
      });
  };

  useEffect(() => {
    AppService.getAvailableFonts()
      .then(fonts => {
        setAvailableFonts(fonts);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setAvailableFonts([]);
      })
      .finally(() => {
        setLoadingFonts(false);
      });
  }, []);

  useEffect(() => {
    AppService.getSupportedOperations()
      .then(operations => {
        setSupportedOperations(operations);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setSupportedOperations([]);
      })
      .finally(() => {
        setLoadingOperations(false);
      });
  }, []);

  return (
    <div className="main-page">
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Number 1:
          <input type="number" value={num1} onChange={e => setNum1(e.target.value)} />
        </label>
        <label>
          Number 2:
          <input type="number" value={num2} onChange={e => setNum2(e.target.value)} />
        </label>
        <label>
          Operator:
          <select value={operator} onChange={e => setOperator(e.target.value)}>
            <option value="">Select an operation</option>
            {supportedOperations.map(op => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </label>
        <button onClick={handleCalculate}>Calculate</button>
      </form>
      {result !== null && <div className="result">Result: {result}</div>}
      {error && <div className="error">Error: {error}</div>}
      {loadingFonts && <div>Loading fonts...</div>}
      <div className="fonts">
        <h3>Available Fonts</h3>
        {availableFonts.map(font => (
          <div key={font.name} className="font-item">{font.name} ({font.alias})</div>
        ))}
      </div>
      {loadingOperations && <div>Loading operations...</div>}
      <div className="operations">
        <h3>Supported Operations</h3>
        {supportedOperations.map(op => (
          <div key={op} className="operation-item">{op}</div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;