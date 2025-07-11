using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api")]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;

        public CalculatorController(CalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> PostCalculation([FromBody] CalculationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _calculatorService.CalculateAsync(request);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DivideByZeroException)
            {
                return BadRequest("Division by zero is not allowed.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }

    public class CalculationRequest
    {
        [Required]
        public double Number1 { get; set; }

        [Required]
        public double Number2 { get; set; }

        [Required]
        public string Operation { get; set; }
    }

    public class CalculatorService
    {
        public Task<double> CalculateAsync(CalculationRequest request)
        {
            return Task.Run(() =>
            {
                return request.Operation switch
                {
                    "add" => request.Number1 + request.Number2,
                    "subtract" => request.Number1 - request.Number2,
                    "multiply" => request.Number1 * request.Number2,
                    "divide" => 
                    {
                        if (request.Number2 == 0) throw new DivideByZeroException();
                        return request.Number1 / request.Number2;
                    },
                    _ => throw new InvalidOperationException("Invalid operation.")
                };
            });
        }
    }
}