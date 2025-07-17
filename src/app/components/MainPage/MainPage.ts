import React, { useState, useEffect } from 'react';
import CalculatorService from '../services/CalculatorService';

const MainPage: React.FC = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [supportedOperations, setSupportedOperations] = useState<string[]>([]);
  const [mainPageData, setMainPageData] = useState<MainPageDataType | null>(null);

  const handleCalculate = () => {
    CalculatorService.calculate(num1, num2, operation)
      .then(res => {
        setResult(res.result);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setResult(null);
      });
  };

  const handleValidateInput = async () => {
    const result = await CalculatorService.validateInput(num1, num2, operation);
    if (result.includes("Validation successful")) {
      setValidationMessage(result);
      setErrorMessage('');
    } else if (result.includes("Validation failed")) {
      setErrorMessage(result);
      setValidationMessage('');
    }
  };

  useEffect(() => {
    const fetchMainPageData = async () => {
      try {
        const data = await CalculatorService.getMainPage();
        setMainPageData(data);
      } catch (error) {
        setError("Failed to fetch main page data");
      }
    };
    fetchMainPageData();
  }, []);

  useEffect(() => {
    CalculatorService.getSupportedOperations()
      .then(operations => setSupportedOperations(operations));
  }, []);

  return (
    <div>
      <input type="text" value={num1} onChange={e => setNum1(e.target.value)} />
      <input type="text" value={num2} onChange={e => setNum2(e.target.value)} />
      <select value={operation} onChange={e => setOperation(e.target.value)}>
        {supportedOperations.map(op => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleValidateInput}>Validate Input</button>
      {result !== null && <div>Result: {result}</div>}
      {error && <div>Error: {error}</div>}
      {validationMessage && <div>{validationMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      {mainPageData && <div>{mainPageData.content}</div>}
    </div>
  );
};

export default MainPage;