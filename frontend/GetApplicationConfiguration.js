

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Colors, Fonts, FontSizes } from './ConfigurationComponents';

const GetApplicationConfiguration = () => {
  const [configuration, setConfiguration] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/application-configuration')
      .then(response => {
        if (response.data && response.data.colors && response.data.fonts && response.data.fontSizes) {
          setConfiguration(response.data);
        } else {
          setError('Invalid response data');
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!configuration || Object.keys(configuration).length === 0) {
    return <div>No configuration data available</div>;
  }

  return (
    <div>
      <h1>Application Configuration</h1>
      <Colors colors={configuration.colors} />
      <Fonts fonts={configuration.fonts} />
      <FontSizes fontSizes={configuration.fontSizes} />
    </div>
  );
};

export default GetApplicationConfiguration;