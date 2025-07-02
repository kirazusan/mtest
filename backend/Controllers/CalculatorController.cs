using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly ICalculatorService _calculatorService;

        public CalculatorController(ICalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request.");
            }

            var validationResult = ValidateInput(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ErrorMessage);
            }

            try
            {
                var result = await _calculatorService.CalculateAsync(request);
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

        [HttpPost("validate")]
        public IActionResult ValidateInput([FromBody] CalculationRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request.");
            }

            var validationResult = ValidateInput(request);
            if (validationResult.IsValid)
            {
                return Ok("Input is valid.");
            }
            return BadRequest(validationResult.ErrorMessage);
        }

        private ValidationResult ValidateInput(CalculationRequest request)
        {
            if (request.Number1 < 0 || request.Number2 < 0)
            {
                return new ValidationResult { IsValid = false, ErrorMessage = "Numbers must be non-negative." };
            }

            if (string.IsNullOrEmpty(request.Operation) || !IsValidOperation(request.Operation))
            {
                return new ValidationResult { IsValid = false, ErrorMessage = "Invalid operation." };
            }

            return new ValidationResult { IsValid = true };
        }

        private bool IsValidOperation(string operation)
        {
            return operation == "add" || operation == "subtract" || operation == "multiply" || operation == "divide";
        }
    }

    public class CalculationRequest
    {
        public double Number1 { get; set; }
        public double Number2 { get; set; }
        public string Operation { get; set; }
    }

    public class CalculationResponse
    {
        public double Result { get; set; }
    }

    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public string ErrorMessage { get; set; }
    }

    public interface ICalculatorService
    {
        Task<double> CalculateAsync(CalculationRequest request);
    }
