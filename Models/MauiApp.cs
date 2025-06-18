

```csharp
using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Maui.Controls;

namespace Models
{
    public class MauiApp : IApplication
    {
        public string MainPage { get; set; }
        public List<string> Handlers { get; set; }
        public string Name { get; set; }
        public MauiAppBuilder Builder { get; set; }

        public MauiApp() {}

        public MauiApp(string mainPage) 
        {
            MainPage = mainPage;
        }

        public MauiAppBuilder CreateBuilder()
        {
            Builder = new MauiAppBuilder();
            return Builder;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<MainPage>();
        }

        public void ConfigureFonts(IFontCollection fonts)
        {
            fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
            fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
        }

        public void ConfigureMauiApp(IMauiHostBuilder builder)
        {
            builder.ConfigureMauiApp(() =>
            {
                builder.Services.AddTransient<MainPage>();
            });
        }

        public void ConfigureWindow(IWindow window)
        {
            window.Title = "Maui App";
        }
    }
}
```