

import React from 'react';
import MauiAppComponent from './MauiAppComponent';
import { MauiApp } from '@maui/app';

const MauiAppContainer = () => {
  const [app, setApp] = React.useState(null);

  React.useEffect(() => {
    const createApp = async () => {
      try {
        const app = await MauiApp.create();
        setApp(app);
      } catch (error) {
        console.error('Error creating app:', error);
      }
    };
    createApp();
  }, []);

  if (!app) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MauiAppComponent app={app} />
    </div>
  );
};

export default MauiAppContainer;