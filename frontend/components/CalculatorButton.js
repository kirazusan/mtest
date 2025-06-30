

import React from 'react';
import PropTypes from 'prop-types';

const CalculatorButton = ({ text, currentEntry, result, currentState, onClick, onButtonClick }) => {
  const handleButtonClick = () => {
    if (result === '0' && text === '0') {
      onButtonClick('0');
      return;
    }

    if (currentEntry.length === 1 && text !== '0') {
      onButtonClick(text);
      return;
    }

    if (currentState < 0) {
      onButtonClick('-');
      return;
    }

    onButtonClick(text);
    onClick(text);
  };

  return (
    <button onClick={handleButtonClick}>
      {text}
    </button>
  );
};

CalculatorButton.propTypes = {
  text: PropTypes.string.isRequired,
  currentEntry: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  currentState: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default CalculatorButton;