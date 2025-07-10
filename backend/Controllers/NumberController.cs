package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using YourNamespace.Extensions;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("api/[controller]")]
public class NumberController : ControllerBase
{
    [HttpPost("format")]
    public IActionResult FormatNumber([FromBody] NumberFormatRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var formattedNumber = request.Number.ToTrimmedString(request.Format);
            return Ok(new { formattedNumber });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}

public class NumberFormatRequest
{
    [Required]
    public double Number { get; set; }

    [Required]
    [StringLength(100)]
    public string Format { get; set; }
}