

import React from 'react';
import PropTypes from 'prop-types';

const CalculatorButton = ({ children, onClick }) => {
  const handleClick = () => {
    if (typeof onClick === 'function') {
      try {
        onClick();
      } catch (error) {
        console.error('Error occurred while calling onClick function:', error);
      }
    }
  };

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

CalculatorButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CalculatorButton.defaultProps = {
  onClick: () => {},
};

export default CalculatorButton;