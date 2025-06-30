

import React, { useState, useEffect } from 'react';

const CalculatorInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleClick = () => {
      if (inputValue.trim() !== '') {
        fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: inputValue }),
        })
          .then((response) => response.json())
          .then((data) => setResult(data.result))
          .catch((error) => setError(error.message));
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="button">Calculate</button>
      {result && <p>Result: {result}</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default CalculatorInput;