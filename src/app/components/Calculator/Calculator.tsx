import React, { useEffect, useState } from 'react';
import { CalculatorService } from '/src/app/services/calculator.service.ts';
import { HttpClientService } from '/src/app/services/http-client.service.ts';

const Calculator = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [inputNumber, setInputNumber] = useState(null);
  const [inputPercentage, setInputPercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [activityState, setActivityState] = useState('active');
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [historyClearedMessage, setHistoryClearedMessage] = useState(null);
  const [debugMessage, setDebugMessage] = useState('');
  const [formattedString, setFormattedString] = useState(null);
  const [genericList, setGenericList] = useState([]);
  const [genericDictionary, setGenericDictionary] = useState({});
  const [genericQueue, setGenericQueue] = useState([]);
  const [genericStack, setGenericStack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const calculatorService = new CalculatorService();
  const httpClientService = new HttpClientService();

  useEffect(() => {
    fetchData('your-api-endpoint');
    getCalculationHistory();
    window.addEventListener('onStart', handleActivityChange);
    window.addEventListener('onResume', handleActivityChange);
    window.addEventListener('onPause', handleActivityChange);
    window.addEventListener('onStop', handleActivityChange);
    window.addEventListener('onDestroy', handleActivityChange);
    return () => {
      window.removeEventListener('onStart', handleActivityChange);
      window.removeEventListener('onResume', handleActivityChange);
      window.removeEventListener('onPause', handleActivityChange);
      window.removeEventListener('onStop', handleActivityChange);
      window.removeEventListener('onDestroy', handleActivityChange);
    };
  }, []);

  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      const data = await httpClientService.get(endpoint);
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCalculationHistory = async () => {
    try {
      const history = await calculatorService.getCalculationHistory();
      setCalculationHistory(history);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCalculate = () => {
    try {
      const calcResult = calculatorService.calculate(value1, value2, operator);
      setResult(calcResult);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleNegative = () => {
    try {
      const negatedValue = calculatorService.toggleNegative(inputNumber);
      setResult(negatedValue);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCalculatePercentage = () => {
    try {
      const percentageResult = calculatorService.calculatePercentage(inputNumber, inputPercentage);
      setResult(percentageResult);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTrimmedString = (target, decimalFormat) => {
    try {
      const trimmedString = calculatorService.toTrimmedString(target, decimalFormat);
      setFormattedString(trimmedString);
    } catch (err) {
      setError(err.message);
    }
  };

  const addToList = (item) => {
    setGenericList([...genericList, item]);
  };

  const removeFromList = (index) => {
    setGenericList(genericList.filter((_, i) => i !== index));
  };

  const addToDictionary = (key, value) => {
    setGenericDictionary({ ...genericDictionary, [key]: value });
  };

  const removeFromDictionary = (key) => {
    const { [key]: _, ...newDict } = genericDictionary;
    setGenericDictionary(newDict);
  };

  const enqueue = (item) => {
    setGenericQueue([...genericQueue, item]);
  };

  const dequeue = () => {
    const [first, ...rest] = genericQueue;
    setGenericQueue(rest);
    return first;
  };

  const push = (item) => {
    setGenericStack([...genericStack, item]);
  };

  const pop = () => {
    const lastItem = genericStack[genericStack.length - 1];
    setGenericStack(genericStack.slice(0, -1));
    return lastItem;
  };

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const handleDebugLog = () => {
    try {
      calculatorService.logDebugMessage(debugMessage);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearHistory = async () => {
    try {
      const message = await calculatorService.clearCalculationHistory();
      setHistoryClearedMessage(message);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderHistory = () => {
    if (calculationHistory.length === 0) {
      return <div>No calculation history available.</div>;
    }
    return calculationHistory.map((entry, index) => (
      <div key={index}>
        {entry.operation}: {entry.operands.join(', ')} = {entry.result} at {entry.timestamp}
      </div>
    ));
  };

  return (
    <div>
      <input type="number" value={value1} onChange={(e) => setValue1(Number(e.target.value))} />
      <input type="number" value={value2} onChange={(e) => setValue2(Number(e.target.value))} />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {loading && <div>Loading...</div>}
      {result !== null && <div>Result: {result}</div>}
      {historyClearedMessage && <div>{historyClearedMessage}</div>}
      {error && <div>Error: {error}</div>}
      <div>{renderHistory()}</div>
    </div>
  );
};

export default Calculator;