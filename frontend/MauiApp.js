

package frontend;

import MauiApp from 'maui-app';
import path from 'path';
import fs from 'fs';

class MauiApplication {
  createInstance() {
    const appDir = path.join(__dirname, '/');
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir);
    }
    const app = new MauiApp();
    const instance = app.createInstance(appDir);
    if (!instance) {
      throw new Error('Failed to create instance');
    }
    return instance;
  }
}

export default MauiApplication;