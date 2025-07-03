package backend.Services;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Hosting;

public class MauiAppService
{
    public IHostBuilder CreateMauiApp()
    {
        return MauiApp.CreateBuilder()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            })
            .ConfigureServices(services =>
            {
                // Register application services here
                services.AddSingleton<SomeService>();
                services.AddTransient<AnotherService>();
            });
    }
}