

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Maui;
using System;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreateMauiAppController : ControllerBase
    {
        private readonly ILogger<CreateMauiAppController> _logger;

        public CreateMauiAppController(ILogger<CreateMauiAppController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult CreateMauiApp()
        {
            try
            {
                var app = MauiProgram.CreateMauiApp();
                if (app != null)
                {
                    return Json(new { success = true, data = app });
                }
                else
                {
                    _logger.LogError("Failed to create MAUI application instance.");
                    return StatusCode(500, new { success = false, message = "Failed to create MAUI application instance." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating MAUI application instance.");
                return StatusCode(500, new { success = false, message = "An error occurred while creating MAUI application instance." });
            }
        }
    }
}