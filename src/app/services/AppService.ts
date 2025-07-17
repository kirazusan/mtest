import { MauiAppBuilder } from 'some-library';
import MainApplication from 'some-other-library';

class AppService {
  static CreateMauiApp() {
    const builder = new MauiAppBuilder();
    builder.configureMainApplicationClass(MainApplication);
    builder.setupFontConfiguration();
    return builder.build();
  }
}

export default AppService;