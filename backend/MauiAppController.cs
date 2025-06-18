

using Microsoft.AspNetCore.Mvc;
using System;

namespace backend
{
    [ApiController]
    [Route("api/[controller]")]
    public class MauiAppController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateMauiApp([FromBody] MauiApp mauiApp)
        {
            MauiApp newMauiApp = new MauiApp
            {
                Name = mauiApp.Name,
                Description = mauiApp.Description
            };

            return CreatedAtAction(nameof(CreateMauiApp), newMauiApp);
        }
    }

    public class MauiApp
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }
        public string Author { get; set; }
    }
}