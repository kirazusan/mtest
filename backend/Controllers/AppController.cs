using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using YourNamespace.Services;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppController : ControllerBase
    {
        private readonly IAppService _appService;

        public AppController(IAppService appService)
        {
            _appService = appService;
        }

        [HttpPost("init")]
        public async Task<IActionResult> InitializeApp()
        {
            var result = await _appService.InitializeAsync();
            if (result)
            {
                return Ok("Application initialized successfully.");
            }
            return BadRequest("Failed to initialize the application.");
        }
    }
}