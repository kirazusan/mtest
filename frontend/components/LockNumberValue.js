

import React, { useState } from 'react';
import axios from 'axios';

const LockNumberValue = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue || isNaN(inputValue)) {
      setError('Please enter a valid number');
      return;
    }
    try {
      const response = await axios.post('/api/lock-number-value', { inputValue });
      if (response.data.result === null || response.data.result === undefined) {
        setError('Invalid result from backend');
      } else {
        setResult(response.data.result);
        setError(null);
      }
    } catch (error) {
      setError('Failed to process input');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter a number"
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result && <p>Result: {result}</p>}
      </form>
    </div>
  );
};

export default LockNumberValue;