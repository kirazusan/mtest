

import React, { useState } from 'react';
import axios from 'axios';

const MauiAppComponent = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputData, setInputData] = useState({});

  const validateInputData = (data) => {
    if (!data.name || !data.description) {
      return false;
    }
    return true;
  };

  const createMauiApp = () => {
    if (!validateInputData(inputData)) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    axios.post('/api/maui-apps', inputData)
      .then(response => {
        if (response.status === 201) {
          setSuccessMessage('MauiApp created successfully!');
          setErrorMessage('');
        } else {
          setErrorMessage('Error creating MauiApp: ' + response.statusText);
          setSuccessMessage('');
        }
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage('Error creating MauiApp: ' + error.response.statusText);
        } else if (error.request) {
          setErrorMessage('Error creating MauiApp: Request timed out');
        } else {
          setErrorMessage('Error creating MauiApp: ' + error.message);
        }
        setSuccessMessage('');
      });
  };

  const handleInputChange = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <input type="text" name="name" value={inputData.name} onChange={handleInputChange} placeholder="Name" />
      <input type="text" name="description" value={inputData.description} onChange={handleInputChange} />
      <button onClick={createMauiApp}>Create MauiApp</button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default MauiAppComponent;