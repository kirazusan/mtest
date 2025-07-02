using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculationController : ControllerBase
    {
        [HttpPost("calculate")]
        public ActionResult<CalculationResponse> Calculate([FromBody] CalculationRequest request)
        {
            if (request == null)
            {
                return BadRequest(new CalculationResponse { Result = double.NaN, ErrorMessage = "Request cannot be null." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new CalculationResponse { Result = double.NaN, ErrorMessage = "Invalid input." });
            }

            if (request.Operation == "divide" && request.Number2 == 0)
            {
                return BadRequest(new CalculationResponse { Result = double.NaN, ErrorMessage = "Division by zero is not allowed." });
            }

            double result = request.Operation switch
            {
                "add" => request.Number1 + request.Number2,
                "subtract" => request.Number1 - request.Number2,
                "multiply" => request.Number1 * request.Number2,
                "divide" => request.Number1 / request.Number2,
                _ => double.NaN
            };

            if (double.IsNaN(result))
            {
                return BadRequest(new CalculationResponse { Result = double.NaN, ErrorMessage = "Unsupported operation." });
            }

            return Ok(new CalculationResponse { Result = result });
        }
    }

    public class CalculationRequest
    {
        [Required]
        public double Number1 { get; set; }

        [Required]
        public double Number2 { get; set; }

        [Required]
        [RegularExpression("add|subtract|multiply|divide", ErrorMessage = "Invalid operation.")]
        public string Operation { get; set; }
    }

    public class CalculationResponse
    {
        public double Result { get; set; }
        public string ErrorMessage { get; set; }
    }
}