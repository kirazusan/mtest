using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;

        public CalculatorController(CalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost("calculate")]
        public ActionResult<CalculationResponse> Calculate([FromBody] CalculationRequest request)
        {
            if (request == null || request.Operand1 == null || request.Operand2 == null || string.IsNullOrEmpty(request.Operator))
            {
                return BadRequest("Operands and operator cannot be null.");
            }

            if (!IsValidOperator(request.Operator))
            {
                return BadRequest("Invalid operator. Supported operators are: +, -, *, /.");
            }

            try
            {
                var result = _calculatorService.Calculate(request.Operand1.Value, request.Operand2.Value, request.Operator);
                return Ok(new CalculationResponse { Result = result });
            }
            catch (DivideByZeroException)
            {
                return BadRequest("Division by zero is not allowed.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private bool IsValidOperator(string op)
        {
            return op == "+" || op == "-" || op == "*" || op == "/";
        }
    }

    public class CalculationRequest
    {
        public double? Operand1 { get; set; }
        public double? Operand2 { get; set; }
        public string Operator { get; set; }
    }

    public class CalculationResponse
    {
        public double Result { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class CalculatorService
    {
        public double Calculate(double operand1, double operand2, string op)
        {
            return op switch
            {
                "+" => operand1 + operand2,
                "-" => operand1 - operand2,
                "*" => operand1 * operand2,
                "/" => operand1 / operand2,
                _ => throw new InvalidOperationException("Invalid operator.")
            };
        }
    }
}