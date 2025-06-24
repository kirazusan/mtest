

package frontend;

import MauiProgram from 'maui-program';

class MauiApp {
  constructor() {
    this.app = new MauiProgram();
  }

  createApp() {
    try {
      const appInstance = this.app.createApp();
      return appInstance.render();
    } catch (error) {
      console.error('Error creating MAUI application instance:', error);
      return null;
    }
  }

  render() {
    const appInstance = this.createApp();
    if (appInstance) {
      return appInstance;
    } else {
      return null;
    }
  }
}

export default MauiApp;