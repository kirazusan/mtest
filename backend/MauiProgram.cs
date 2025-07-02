package backend;

using Microsoft.Maui.Controls.Hosting;
using Microsoft.Extensions.DependencyInjection;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            });

        builder.Services.AddSingleton<MainPage>();
        builder.Services.AddTransient<SomeService>();
        builder.Services.AddSingleton<AnotherService>();
        builder.Services.AddTransient<SomeViewModel>();

        return builder.Build();
    }
}