

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConvertDoubleToTrimmedStringComponent = () => {
  const [doubleValue, setDoubleValue] = useState('');
  const [decimalFormat, setDecimalFormat] = useState('');
  const [trimmedString, setTrimmedString] = useState('');
  const [decimalFormats, setDecimalFormats] = useState([]);
  const [error, setError] = useState(null);
  const [apiEndpointUrl, setApiEndpointUrl] = useState('/api/ConvertDoubleToTrimmedString');

  useEffect(() => {
    const fetchDecimalFormats = async () => {
      try {
        const response = await axios.get('/api/GetDecimalFormats');
        setDecimalFormats(response.data);
      } catch (error) {
        setError('Failed to fetch decimal formats');
      }
    };
    fetchDecimalFormats();
  }, []);

  const handleDoubleValueChange = (event) => {
    const value = event.target.value;
    if (!isNaN(parseFloat(value)) && value !== '')) {
      setError('Invalid double value');
    } else {
      setError(null);
    }
    setDoubleValue(value);
  };

  const handleDecimalFormatChange = (event) => {
    setDecimalFormat(event.target.value);
  };

  const handleConvertClick = () => {
    if (error) return;
    axios.post(apiEndpointUrl, {
      doubleValue,
      decimalFormat,
    })
      .then((response) => {
        setTrimmedString(response.data);
      })
      .catch((error) => {
        setError('Failed to convert double to trimmed string');
      });
  };

  return (
    <div>
      <input
        type="text"
        value={doubleValue}
        onChange={handleDoubleValueChange}
        placeholder="Enter a double value"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={decimalFormat} onChange={handleDecimalFormatChange}>
        <option value="">Select a decimal format</option>
        {decimalFormats.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
      <button onClick={handleConvertClick}>Convert</button>
      <p>Trimmed string: {trimmedString}</p>
    </div>
  );
};

export default ConvertDoubleToTrimmedStringComponent;