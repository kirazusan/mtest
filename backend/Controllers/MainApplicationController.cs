package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using System;

public class AppConfig
{
    public string Setting1 { get; set; }
    public string Setting2 { get; set; }
}

[ApiController]
[Route("[controller]")]
public class MainApplicationController : ControllerBase
{
    [HttpPost("create")]
    public ActionResult<AppConfig> CreateApp()
    {
        try
        {
            var config = new AppConfig
            {
                Setting1 = "Value1",
                Setting2 = "Value2"
            };
            return Ok(config);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest($"Invalid argument: {ex.Message}");
        }
        catch (InvalidOperationException ex)
        {
            return Conflict($"Operation error: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}