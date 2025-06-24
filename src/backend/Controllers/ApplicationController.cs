

using Microsoft.AspNetCore.Mvc;
using src.backend.Services;

namespace src.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationService _applicationService;

        public ApplicationController(ApplicationService applicationService)
        {
            _applicationService = applicationService ?? throw new ArgumentNullException(nameof(applicationService));
        }

        [HttpPost]
        [Route("start")]
        public async Task<IActionResult> StartApplication()
        {
            try
            {
                await _applicationService.StartApplicationAsync();
                return Ok("Application started successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}