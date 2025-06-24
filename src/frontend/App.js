

import React from 'react';
import ApplicationStart from './ApplicationStart';
import ApplicationService from './ApplicationService';

const App = () => {
  const startApplication = ApplicationService.startApplication;

  return (
    <div>
      <ApplicationStart startApplication={startApplication} />
    </div>
  );
};

export default App;