

import React from 'react';

const Button = ({ onClick, children }) => {
  if (typeof onClick !== 'function') {
    throw new Error('onClick prop must be a function');
  }

  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;