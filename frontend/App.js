

import React, { useEffect, useState } from 'react';
import ConfigureComponent from './ConfigureComponent';
import ConfigureService from './ConfigureService';

const App = () => {
  const [configureService, setConfigureService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const service = new ConfigureService();
    setConfigureService(service);
    service.configurePipeline().catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!configureService) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ConfigureComponent />
    </div>
  );
};

export default App;