using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MyProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoubleExtensionsController : ControllerBase
    {
        [HttpPost("trimmed")]
        public IActionResult GetTrimmedDouble([FromBody] DoubleRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Format))
            {
                return BadRequest("Invalid request data.");
            }

            try
            {
                var trimmedString = DoubleExtensions.ToTrimmedString(request.Value, request.Format);
                return Ok(new { TrimmedString = trimmedString });
            }
            catch (FormatException)
            {
                return BadRequest("Invalid format string.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }

    public class DoubleRequest
    {
        public double Value { get; set; }
        public string Format { get; set; }
    }

    public static class DoubleExtensions
    {
        public static string ToTrimmedString(double value, string format)
        {
            return value.ToString(format).TrimEnd('0').TrimEnd('.');
        }
    }
}