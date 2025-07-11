using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NumberFormatterController : ControllerBase
    {
        [HttpPost("trimmedstring")]
        public IActionResult GetTrimmedString([FromBody] NumberFormatRequest request)
        {
            if (request == null || !request.Value.HasValue || string.IsNullOrWhiteSpace(request.Format))
            {
                return BadRequest("Invalid input.");
            }

            try
            {
                double value = request.Value.Value;
                string formattedString = DoubleExtensions.ToTrimmedString(value, request.Format);
                return Ok(new { Result = formattedString });
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

    public class NumberFormatRequest
    {
        public double? Value { get; set; }
        public string Format { get; set; }
    }

    public static class DoubleExtensions
    {
        public static string ToTrimmedString(double value, string format)
        {
            return value.ToString(format, CultureInfo.InvariantCulture).TrimEnd('0').TrimEnd('.');
        }
    }
}