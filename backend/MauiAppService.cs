

```csharp
using Microsoft.Maui.Controls;
using Microsoft.Extensions.Logging;

namespace MauiApp.Services
{
    public class MauiAppService
    {
        private readonly ILogger<MauiAppService> _logger;

        public MauiAppService(ILogger<MauiAppService> logger)
        {
            _logger = logger;
        }

        public MauiProgram CreateMauiApp()
        {
            try
            {
                var mauiApp = Microsoft.Maui.Controls.MauiProgram.CreateMauiApp();
                if (mauiApp == null)
                {
                    _logger.LogError("Failed to create MAUI application instance.");
                    throw new InvalidOperationException("Failed to create MAUI application instance.");
                }
                return mauiApp;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating MAUI application instance.");
                throw;
            }
        }
    }
}
```