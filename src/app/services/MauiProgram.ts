import { MauiApp } from 'some-maui-library';
import { App } from 'some-app-library';

export class MauiProgram {
    public static CreateMauiApp(): MauiApp {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>();
        builder.ConfigureFonts(fonts => {
            fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
            fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
        });
        return builder.Build();
    }
}