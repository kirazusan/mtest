

```csharp
using Microsoft.Maui.Controls;

namespace Maui
{
    public sealed class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            var app = builder.Build();
            return app;
        }
    }
}
```