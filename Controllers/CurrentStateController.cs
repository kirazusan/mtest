

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Controllers
{
    [ApiController]
    public class CurrentStateController : ControllerBase
    {
        private readonly ILogger<CurrentStateController> _logger;
        private int currentState = 0;

        public CurrentStateController(ILogger<CurrentStateController> logger)
        {
            _logger = logger;
        }

        public IActionResult UpdateCurrentState()
        {
            currentState = -2;
            _logger.LogInformation($"Updated current state to {currentState}");
            return Ok();
        }
    }
}