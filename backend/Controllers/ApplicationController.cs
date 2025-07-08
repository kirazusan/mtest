using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public ApplicationController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet("create")]
        public async Task<IActionResult> CreateApplication()
        {
            var result = await _applicationService.InitializeApplicationAsync();
            if (!result)
            {
                return BadRequest(new { success = false, message = "Application initialization failed." });
            }
            return Ok(new { success = true });
        }
    }
}