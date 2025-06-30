

import React, { useState } from 'react';
import axios from 'axios';

class MauiProgram {
  static createMauiApp(data) {
    return new MauiApp(data);
  }
}

class MauiApp {
  constructor(data) {
    this.data = data;
  }
}

const MauiAppCreator = () => {
  const [mauiApp, setMauiApp] = useState(null);

  const createMauiApp = async () => {
    try {
      const response = await axios.post('/api/create-maui-app');
      const mauiAppInstance = MauiProgram.createMauiApp(response.data);
      setMauiApp(mauiAppInstance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={createMauiApp}>Create Maui App</button>
      {mauiApp && <div>Maui App created: {mauiApp.data}</div>}
    </div>
  );
};

export default MauiAppCreator;