using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainApplicationController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;

        public MainApplicationController(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        [HttpPost("create-app")]
        public IActionResult CreateApp()
        {
            var appConfig = _serviceProvider.GetService<IAppConfiguration>();
            if (appConfig == null)
            {
                return NotFound("Application configuration not found.");
            }
            return Ok(appConfig);
        }
    }
}