import MauiProgram from './MauiProgram';

class Program extends MauiApplication {
  static Main(args) {
    const program = new Program();
    program.Run(args);
  }

  CreateMauiApp() {
    return MauiProgram.CreateMauiApp();
  }
}

export default Program;