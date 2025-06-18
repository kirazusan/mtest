

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResetCurrentEntryController : ControllerBase
    {
        private readonly ILogger _logger;

        public ResetCurrentEntryController(ILogger<ResetCurrentEntryController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult ResetCurrentEntry()
        {
            try
            {
                if (HttpContext.Session != null)
                {
                    if (HttpContext.Session.Keys.Contains("CurrentEntry"))
                    {
                        HttpContext.Session.SetString("CurrentEntry", "");
                        _logger.LogInformation("Current entry has been reset.");
                        return Ok();
                    }
                    else
                    {
                        _logger.LogWarning("Current entry key does not exist in the session.");
                        return NotFound();
                    }
                }
                else
                {
                    _logger.LogError("HttpContext.Session is null.");
                    return StatusCode(500);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while resetting the current entry.");
                return StatusCode(500);
            }
        }
    }
}