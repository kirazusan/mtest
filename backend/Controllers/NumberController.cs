using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NumberController : ControllerBase
    {
        [HttpPost("format")]
        public IActionResult FormatDouble([FromBody] NumberFormatRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var formattedValue = DoubleExtensions.ToTrimmedString(request.Value, request.Format);
                return Ok(new { formattedValue });
            }
            catch
            {
                return StatusCode(500, "An error occurred while formatting the number.");
            }
        }
    }

    public class NumberFormatRequest
    {
        [Required]
        public double Value { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*\.?[0-9]*$", ErrorMessage = "Invalid format.")]
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