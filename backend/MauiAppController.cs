

```csharp
using Microsoft.AspNetCore.Mvc;
using MauiAppCreator;
using System;

namespace backend
{
    [ApiController]
    [Route("api/[controller]")]
    public class MauiAppController : ControllerBase
    {
        private readonly MauiAppCreator _mauiAppCreator;

        public MauiAppController(MauiAppCreator mauiAppCreator)
        {
            _mauiAppCreator = mauiAppCreator;
        }

        [HttpPost]
        public IActionResult CreateMauiApp()
        {
            try
            {
                var mauiApp = _mauiAppCreator.CreateMauiApp();
                if (mauiApp == null)
                {
                    return NotFound("MauiApp instance is not initialized");
                }
                return Ok(mauiApp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating MauiApp instance: {ex.Message}");
            }
        }
    }
}
```