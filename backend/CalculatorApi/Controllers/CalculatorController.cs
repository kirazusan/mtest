using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CalculatorApi.Controllers
{
    [ApiController]
    [Route("api/calculator")]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;

        public CalculatorController(CalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Operation) || 
                (request.Operation != "add" && request.Operation != "subtract" && 
                 request.Operation != "multiply" && request.Operation != "divide"))
            {
                return BadRequest("Invalid calculation request.");
            }

            try
            {
                var result = await _calculatorService.CalculateAsync(request);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    public class CalculationRequest
    {
        public double Number1 { get; set; }
        public double Number2 { get; set; }
        public string Operation { get; set; }
    }

    public class CalculatorService
    {
        public Task<double> CalculateAsync(CalculationRequest request)
        {
            double result;

            switch (request.Operation)
            {
                case "add":
                    result = request.Number1 + request.Number2;
                    break;
                case "subtract":
                    result = request.Number1 - request.Number2;
                    break;
                case "multiply":
                    result = request.Number1 * request.Number2;
                    break;
                case "divide":
                    if (request.Number2 == 0)
                    {
                        throw new System.DivideByZeroException("Cannot divide by zero.");
                    }
                    result = request.Number1 / request.Number2;
                    break;
                default:
                    throw new System.InvalidOperationException("Invalid operation.");
            }

            return Task.FromResult(result);
        }
    }
}