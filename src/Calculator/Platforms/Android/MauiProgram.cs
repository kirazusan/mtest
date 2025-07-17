using Microsoft.Maui;
using Microsoft.Maui.Hosting;

namespace Calculator.Platforms.Android
{
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

            return builder.Build();
        }

        public static void Main(string[] args)
        {
            UIApplication.Main(args, null, typeof(AppDelegate));
        }

        public static void initializeReactApp()
        {
        }
    }

    public class AppDelegate : MauiUIApplicationDelegate
    {
        public AppDelegate() : base()
        {
        }

        protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
    }
}