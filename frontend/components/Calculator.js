

import React, { useState } from 'react';

const Calculator = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [resultText, setResultText] = useState('0');
  const [currentState, setCurrentState] = useState(0);
  const [decimalFormat, setDecimalFormat] = useState('');

  const handleButtonPress = (pressed) => {
    if (!isNaN(pressed) || pressed === '.') {
      setCurrentEntry(currentEntry + pressed);
      if ((resultText === '0' && pressed === '0') || (currentEntry.length <= 1 && pressed !== '0') || currentState < 0) {
        setResultText('');
        setCurrentState(Math.abs(currentState));
      }
      if (pressed === '.' && decimalFormat !== 'N2') {
        setDecimalFormat('N2');
      }
      setResultText(resultText + pressed);
    }
  };

  const handleOperation = (operation) => {
    if (['+', '-', '*', '/'].includes(operation)) {
      setCurrentState(currentState + 1);
      setCurrentEntry('');
      setResultText(resultText + operation);
    }
  };

  const handleEquals = () => {
    if (currentState >= 0 && !isNaN(resultText)) {
      const result = eval(resultText);
      setResultText(result.toString());
      setCurrentState(0);
      setCurrentEntry('');
    }
  };

  return (
    <div>
      <input type="text" value={resultText} readOnly />
      <button onClick={() => handleButtonPress('0')}>0</button>
      <button onClick={() => handleButtonPress('1')}>1</button>
      <button onClick={() => handleButtonPress('2')}>2</button>
      <button onClick={() => handleButtonPress('3')}>3</button>
      <button onClick={() => handleButtonPress('4')}>4</button>
      <button onClick={() => handleButtonPress('5')}>5</button>
      <button onClick={() => handleButtonPress('6')}>6</button>
      <button onClick={() => handleButtonPress('7')}>7</button>
      <button onClick={() => handleButtonPress('8')}>8</button>
      <button onClick={() => handleButtonPress('9')}>9</button>
      <button onClick={() => handleButtonPress('.')}>.</button>
      <button onClick={() => handleOperation('+')}>+</button>
      <button onClick={() => handleOperation('-')}>-</button>
      <button onClick={() => handleOperation('*')}>*</button>
      <button onClick={() => handleOperation('/')}>/</button>
      <button onClick={handleEquals}>=</button>
    </div>
  );
};

export default Calculator;