

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StartupConfiguration = () => {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/startup-configuration')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data && typeof data === 'object') {
            if (Array.isArray(data.permissionRequests) && Array.isArray(data.notificationChannelSettings)) {
              setConfig(data);
            } else {
              setError('Invalid response data');
            }
          } else {
            setError('Invalid response data');
          }
        } else {
          setError(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .catch(error => {
        setError(`Error: ${error.message}`);
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Startup Configuration</h1>
      <h2>Permission Requests:</h2>
      <ul>
        {config.permissionRequests.map(request => (
          <li key={request.id}>{request.name}</li>
        ))}
      </ul>
      <h2>Notification Channel Settings:</h2>
      <ul>
        {config.notificationChannelSettings.map(setting => (
          <li key={setting.id}>{setting.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StartupConfiguration;