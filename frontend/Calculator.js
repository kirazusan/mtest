

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { selectNumber, resetCalculatorState } from '../actions';

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [decimalFormat, setDecimalFormat] = useState('');
  const [currentEntry, setCurrentEntry] = useState('');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(
    'calculatorState',
    async () => {
      const response = await axios.get('/api/calculate');
      return response.data;
    },
    {
      onSuccess: (data) => {
        setFirstNumber(data.firstNumber);
        setSecondNumber(data.secondNumber);
        setCurrentState(data.currentState);
        setDecimalFormat(data.decimalFormat);
        setCurrentEntry(data.currentEntry);
      },
    }
  );

  const { mutate, isLoading: isMutating } = useMutation(
    async (newState) => {
      const response = await axios.post('/api/calculate', newState);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('calculatorState');
      },
    }
  );

  const handleNumberSelect = (number) => {
    dispatch(selectNumber(number));
  };

  const handleReset = async () => {
    await mutate({ firstNumber: '', secondNumber: '', currentState: '', decimalFormat: '', currentEntry: '' });
    setFirstNumber('');
    setSecondNumber('');
    setCurrentState('');
    setDecimalFormat('');
    setCurrentEntry('');
    dispatch(resetCalculatorState());
  };

  const handleCalculate = async () => {
    const newState = {
      firstNumber,
      secondNumber,
      currentState,
      decimalFormat,
      currentEntry,
    };
    await mutate(newState);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input type="number" value={firstNumber} onChange={(e) => setFirstNumber(e.target.value)} />
      <input type="number" value={secondNumber} onChange={(e) => setSecondNumber(e.target.value)} />
      <button onClick={() => handleNumberSelect(1)}>1</button>
      <button onClick={() => handleNumberSelect(2)}>2</button>
      <button onClick={() => handleNumberSelect(3)}>3</button>
      <button onClick={() => handleNumberSelect(4)}>4</button>
      <button onClick={() => handleNumberSelect(5)}>5</button>
      <button onClick={() => handleNumberSelect(6)}>6</button>
      <button onClick={() => handleNumberSelect(7)}>7</button>
      <button onClick={() => handleNumberSelect(8)}>8</button>
      <button onClick={() => handleNumberSelect(9)}>9</button>
      <button onClick={() => handleNumberSelect(0)}>0</button>
      <button onClick={() => handleNumberSelect('.')}>.</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleCalculate}>Calculate</button>
      <p>Result: {currentState}</p>
    </div>
  );
};

export default Calculator;