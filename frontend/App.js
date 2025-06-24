

import React, { useState, useEffect } from 'react';
import AppDelegate from './AppDelegate';
import AppDelegateComponent from './AppDelegateComponent';
import MauiApp from './MauiApp';
import LockNumberValue from './LockNumberValue';
import axios from 'axios';

function App() {
  const [appDelegate, setAppDelegate] = useState(null);
  const [mauiAppCreated, setMauiAppCreated] = useState(false);
  const [numberValue, setNumberValue] = useState(null);

  useEffect(() => {
    const appDelegateInstance = new AppDelegate();
    setAppDelegate(appDelegateInstance);
  }, []);

  useEffect(() => {
    axios.post('/CreateMauiApp')
      .then(() => {
        setMauiAppCreated(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (appDelegate) {
      setNumberValue(appDelegate.numberValue);
    }
  }, [appDelegate]);

  if (!mauiAppCreated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppDelegateComponent appDelegate={appDelegate} />
      <MauiApp />
      <LockNumberValue numberValue={numberValue} />
    </div>
  );
}

export default App;