

import React, { useState } from 'react';
import CalculatorButton from './CalculatorButton';

const Calculator = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [resultText, setResultText] = useState('');
  const [currentState, setCurrentState] = useState(0);
  const [decimalFormat, setDecimalFormat] = useState('');

  const handleButtonClick = (number) => {
    setCurrentEntry(currentEntry + number);
    if (number === '.') {
      setDecimalFormat('N2');
    }
    if (currentState < 0) {
      setCurrentState(currentState * -1);
      setResultText(formatResult(currentEntry, decimalFormat, currentState * -1));
    } else {
      setResultText(formatResult(currentEntry, decimalFormat, currentState));
    }
  };

  const handleClear = () => {
    setCurrentEntry('');
    setResultText('');
    setCurrentState(0);
    setDecimalFormat('');
  };

  const formatResult = (entry, format, state) => {
    if (format === 'N2') {
      return parseFloat(entry).toFixed(2);
    }
    if (state < 0) {
      return '-' + entry;
    }
    return entry;
  };

  return (
    <div className={`calculator ${currentState < 0 ? 'negative' : ''} ${decimalFormat}`}>
      <div className="result-text">{resultText}</div>
      <div className="button-container">
        <CalculatorButton number="7" onClick={() => handleButtonClick('7')} />
        <CalculatorButton number="8" onClick={() => handleButtonClick('8')} />
        <CalculatorButton number="9" onClick={() => handleButtonClick('9')} />
        <CalculatorButton number="4" onClick={() => handleButtonClick('4')} />
        <CalculatorButton number="5" onClick={() => handleButtonClick('5')} />
        <CalculatorButton number="6" onClick={() => handleButtonClick('6')} />
        <CalculatorButton number="1" onClick={() => handleButtonClick('1')} />
        <CalculatorButton number="2" onClick={() => handleButtonClick('2')} />
        <CalculatorButton number="3" onClick={() => handleButtonClick('3')} />
        <CalculatorButton number="0" onClick={() => handleButtonClick('0')} />
        <CalculatorButton number="." onClick={() => handleButtonClick('.')} />
        <CalculatorButton number="C" onClick={handleClear} />
      </div>
    </div>
  );
};

export default Calculator;