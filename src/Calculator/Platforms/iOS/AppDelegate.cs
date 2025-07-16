using Foundation;
using Microsoft.Maui;

namespace Calculator.Platforms.iOS
{
    [Register("AppDelegate")]
    public class AppDelegate : MauiUIApplicationDelegate
    {
        public AppDelegate() : base() { }

        protected override MauiApp CreateMauiApp() => MyMauiAppService.CreateMauiApp();
    }
}