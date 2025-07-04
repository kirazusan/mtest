using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Controllers
{
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
                var result = DoubleExtensions.ToTrimmedString(request.Number, request.Format);
                return Ok(new { formattedNumber = result });
            }
            catch
            {
                return BadRequest("Invalid input for number formatting.");
            }
        }
    }

    public class NumberFormatRequest
    {
        [Required]
        public double Number { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]+)?$", ErrorMessage = "Invalid format.")]
        public string Format { get; set; }
    }

    public static class DoubleExtensions
    {
        public static string ToTrimmedString(double number, string format)
        {
            return number.ToString(format).TrimEnd('0').TrimEnd('.');
        }
    }
}