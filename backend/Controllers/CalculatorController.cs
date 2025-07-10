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

        [HttpPost]
        public ActionResult<CalculationResult> Calculate([FromBody] CalculationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = _calculatorService.PerformCalculation(request);
                return Ok(result);
            }
            catch (DivideByZeroException)
            {
                return BadRequest("Division by zero is not allowed.");
            }
        }
    }

    public class CalculationRequest
    {
        [Required]
        public double Operand1 { get; set; }

        [Required]
        public double Operand2 { get; set; }

        [Required]
        public string Operation { get; set; }
    }

    public class CalculationResult
    {
        public double Result { get; set; }
    }

    public class CalculatorService
    {
        public CalculationResult PerformCalculation(CalculationRequest request)
        {
            double result = request.Operation switch
            {
                "add" => request.Operand1 + request.Operand2,
                "subtract" => request.Operand1 - request.Operand2,
                "multiply" => request.Operand1 * request.Operand2,
                "divide" => 
                {
                    if (request.Operand2 == 0)
                    {
                        throw new DivideByZeroException();
                    }
                    return request.Operand1 / request.Operand2;
                },
                _ => throw new InvalidOperationException("Invalid operation")
            };

            return new CalculationResult { Result = result };
        }
    }
}