

import React from 'react';
import { MauiApp } from '@maui/app';
import MauiAppContainer from './MauiAppContainer';

class MauiAppComponent extends React.Component {
  createMauiApp = () => {
    return (
      <MauiApp>
        <MauiAppContainer />
      </MauiApp>
    );
  };

  render() {
    return this.createMauiApp();
  }
}

export default MauiAppComponent;