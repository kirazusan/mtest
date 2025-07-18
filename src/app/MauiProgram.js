import { createApp } from 'react';
import MainActivity from './MainActivity';

class MauiProgram {
  static CreateMauiApp() {
    return createApp(MainActivity).mount('#app');
  }
}

export default MauiProgram;