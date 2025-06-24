

import React, { useState, useEffect } from 'react';
import MauiApp from './MauiApp';
import MauiProgram from './MauiProgram';

const MauiAppCreator = () => {
  const [mauiApp, setMauiApp] = useState(null);

  const createMauiApp = async () => {
    const mauiAppInstance = await MauiProgram.CreateMauiApp();
    setMauiApp(mauiAppInstance);
    return mauiAppInstance;
  };

  useEffect(() => {
    createMauiApp();
  }, []);

  return { createMauiApp, mauiApp };
};

export default MauiAppCreator;