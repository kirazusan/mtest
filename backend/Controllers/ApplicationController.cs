using Microsoft.AspNetCore.Mvc;
using YourNamespace.Services;
using System;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationService _applicationService;

        public ApplicationController(ApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpPost("create")]
        public ActionResult<string> CreateApp([FromBody] ApplicationInitData initData)
        {
            try
            {
                var result = _applicationService.InitializeApplication(initData);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    public class ApplicationInitData
    {
        public string Name { get; set; }
        public string Version { get; set; }
        // Add other initialization properties as needed
    }
}