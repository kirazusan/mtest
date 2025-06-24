

import React, { useState } from 'react';
import axios from 'axios';

const CalculatorInput = () => {
  const [currentState, setCurrentState] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [currentEntry, setCurrentEntry] = useState('');

  const handleInputChange = (event) => {
    setCurrentEntry(event.target.value);
  };

  const handleButtonClick = () => {
    axios.post('/api/LockNumberValue', { currentEntry })
      .then((response) => {
        setCurrentEntry(response.data);
        setCurrentState(response.data.state);
        setFirstNumber(response.data.firstNumber);
        setSecondNumber(response.data.secondNumber);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input type="text" value={currentEntry} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Lock Number Value</button>
    </div>
  );
};

export default CalculatorInput;