

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorService from '../services/CalculatorService';

const Calculator = ({ currentEntry, result, dispatch }) => {
  const [state, setState] = useState({
    firstNumber: '',
    secondNumber: '',
    currentState: '',
    decimalFormat: '',
    currentEntry: ''
  });

  useEffect(() => {
    setState({ ...state, currentEntry });
  }, [currentEntry]);

  const onClear = () => {
    setState({
      firstNumber: '',
      secondNumber: '',
      currentState: '',
      decimalFormat: '',
      currentEntry: ''
    });
    dispatch({ type: 'CLEAR' });
  };

  const resetCalculatorState = () => {
    setState({
      firstNumber: '',
      secondNumber: '',
      currentState: '',
      decimalFormat: '',
      currentEntry: ''
    });
    dispatch({ type: 'RESET' });
  };

  const handleButtonClick = (buttonValue) => {
    if (buttonValue === 'C') {
      onClear();
    } else if (buttonValue === '=') {
      const result = CalculatorService.calculate(state.firstNumber, state.secondNumber, state.currentState);
      setState({ ...state, result });
      dispatch({ type: 'RESULT', payload: result });
    } else if (buttonValue === '.') {
      setState({ ...state, decimalFormat: '.' });
    } else if (buttonValue === 'reset') {
      resetCalculatorState();
    } else {
      const currentEntry = state.currentEntry + buttonValue;
      setState({ ...state, currentEntry });
      dispatch({ type: 'UPDATE_CURRENT_ENTRY', payload: currentEntry });
    }
  };

  return (
    <div>
      <CalculatorDisplay result={result} />
      <div>
        <CalculatorButton value="7" onClick={handleButtonClick} />
        <CalculatorButton value="8" onClick={handleButtonClick} />
        <CalculatorButton value="9" onClick={handleButtonClick} />
        <CalculatorButton value="/" onClick={handleButtonClick} />
      </div>
      <div>
        <CalculatorButton value="4" onClick={handleButtonClick} />
        <CalculatorButton value="5" onClick={handleButtonClick} />
        <CalculatorButton value="6" onClick={handleButtonClick} />
        <CalculatorButton value="*" onClick={handleButtonClick} />
      </div>
      <div>
        <CalculatorButton value="1" onClick={handleButtonClick} />
        <CalculatorButton value="2" onClick={handleButtonClick} />
        <CalculatorButton value="3" onClick={handleButtonClick} />
        <CalculatorButton value="-" onClick={handleButtonClick} />
      </div>
      <div>
        <CalculatorButton value="0" onClick={handleButtonClick} />
        <CalculatorButton value="." onClick={handleButtonClick} />
        <CalculatorButton value="=" onClick={handleButtonClick} />
        <CalculatorButton value="+" onClick={handleButtonClick} />
      </div>
      <div>
        <CalculatorButton value="C" onClick={handleButtonClick} />
        <CalculatorButton value="reset" onClick={handleButtonClick} />
      </div>
      <div>
        <p id="resultText">{result}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentEntry: state.currentEntry,
    result: state.result
  };
};

export default connect(mapStateToProps)(Calculator);