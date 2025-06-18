

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Maui;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MauiAppController : ControllerBase
    {
        [HttpPost]
        public MauiApp CreateMauiApp()
        {
            try
            {
                return new MauiApp();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create a new instance of MauiApp", ex);
            }
        }
    }
}
```