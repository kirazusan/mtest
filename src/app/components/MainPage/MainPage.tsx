import React from 'react';
import './MainPage.css';

const DisplayArea = () => {
  return (
    <div className="display-area">
      <label id="CurrentCalculation" className="current-calculation" htmlFor="currentCalculationInput">Current Calculation</label>
      <div id="Separator" className="separator"></div>
      <label id="resultText" className="result-text" htmlFor="resultTextInput">Result</label>
    </div>
  );
};

const InputButtons = () => {
  const handleButtonClick = (value: string) => {
    // Placeholder for button click handling
  };

  return (
    <div className="input-buttons">
      {['C', '+/-', '%', '7', '8', '9', '4', '5', '6', '1', '2', '3', '00', '0', '.'].map((label) => (
        <button key={label} id={label} className="number-button" onClick={() => handleButtonClick(label)}>{label}</button>
      ))}
      {['÷', '×', '-', '+', '='].map((label) => (
        <button key={label} id={label} className="operator-button" onClick={() => handleButtonClick(label)}>{label}</button>
      ))}
    </div>
  );
};

const MainPage = () => {
  return (
    <div className="app">
      <DisplayArea />
      <InputButtons />
    </div>
  );
};

export default MainPage;