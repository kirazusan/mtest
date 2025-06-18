

using Microsoft.Maui.Controls;
using Microsoft.Maui.Hosting;

namespace MauiApp1
{
    public class MauiProgram : MauiApp
    {
        protected override MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                });

            return builder.Build();
        }
    }
}