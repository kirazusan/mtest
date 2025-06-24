

```csharp
using Microsoft.Maui;
using Microsoft.Maui.Controls;

namespace MainApplication
{
    public class MauiApp : MauiApplication
    {
        public MauiApp()
        {
            InitializeComponent();
            MainPage = new MainPage();
        }

        protected override MauiApp CreateMauiApp()
        {
            var app = new MauiApp
            {
                MainPage = new MainPage()
            };
            return app;
        }
    }
}
```