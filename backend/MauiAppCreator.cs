

```csharp
using Microsoft.Maui;

namespace Microsoft.Maui
{
    public class MauiAppCreator : MauiUIApplicationDelegate
    {
        public MauiApp CreateMauiApp()
        {
            try
            {
                return MauiProgram.CreateMauiApp();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create MauiApp instance", ex);
            }
        }
    }
}
```