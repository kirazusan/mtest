

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using CalculatorBackend.Services;

namespace CalculatorBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InitializeApplicationController : ControllerBase
    {
        private readonly ILogger<InitializeApplicationController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IInitializeApplicationService _initializeApplicationService;

        public InitializeApplicationController(ILogger<InitializeApplicationController> logger, IConfiguration configuration, IInitializeApplicationService initializeApplicationService)
        {
            _logger = logger;
            _configuration = configuration;
            _initializeApplicationService = initializeApplicationService;
        }

        [HttpPost]
        public IActionResult InitializeApplication()
        {
            try
            {
                _initializeApplicationService.InitializeApplication();
                _logger.LogInformation("InitializeApplication method called successfully.");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while calling InitializeApplication method.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}