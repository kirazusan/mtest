

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Button = (props) => {
  const [buttonText, setButtonText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!props.buttonId && !props.buttonName) {
      setError('Either buttonId or buttonName is required');
      return;
    }

    if (props.buttonId && props.buttonName) {
      setError('Only one of buttonId or buttonName can be provided');
      return;
    }

    const getButtonText = async () => {
      try {
        const response = await axios.get(`https://api.example.com/button-text/${props.buttonId || props.buttonName}`);
        if (response.status === 200) {
          setButtonText(response.data.text);
        } else {
          setError(`Failed to retrieve button text: ${response.status}`);
        }
      } catch (error) {
        setError(`Failed to retrieve button text: ${error.message}`);
      }
    };
    getButtonText();
  }, [props.buttonId, props.buttonName]);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <button>
      {buttonText}
    </button>
  );
};

export default Button;