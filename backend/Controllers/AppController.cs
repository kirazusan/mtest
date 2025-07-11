using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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

        [HttpGet("config")]
        public async Task<IActionResult> GetAppConfig()
        {
            var config = await _appService.GetAppConfigAsync();
            return Ok(config);
        }
    }
}