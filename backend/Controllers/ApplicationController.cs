package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using YourNamespace.Services;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("api/[controller]")]
public class ApplicationController : ControllerBase
{
    private readonly MauiProgram _mauiProgram;
    private readonly ILogger<ApplicationController> _logger;

    public ApplicationController(MauiProgram mauiProgram, ILogger<ApplicationController> logger)
    {
        _mauiProgram = mauiProgram;
        _logger = logger;
    }

    [HttpPost("create")]
    public IActionResult CreateApp([FromBody] AppCreationRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.AppName))
        {
            return BadRequest(new { success = false, message = "Invalid request parameters." });
        }

        try
        {
            var app = _mauiProgram.CreateMauiApp();
            return Ok(new { success = true, app });
        }
        catch (ArgumentNullException ex)
        {
            _logger.LogError(ex, "Argument null exception occurred while creating the app.");
            return BadRequest(new { success = false, message = "An argument was null." });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation exception occurred while creating the app.");
            return StatusCode(500, new { success = false, message = "Invalid operation." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred while creating the app.");
            return StatusCode(500, new { success = false, message = "An unexpected error occurred." });
        }
    }
}

public class AppCreationRequest
{
    public string AppName { get; set; }
}