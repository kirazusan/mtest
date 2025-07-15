using Microsoft.AspNetCore.Mvc;
using System;

namespace YourNamespace.Controllers
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
        public ActionResult<CalculationResult> Calculate([FromBody] CalculationRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Operator))
            {
                return BadRequest("Invalid request.");
            }

            try
            {
                var result = _calculatorService.Calculate(request);
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
        }
    }

    public class CalculationRequest
    {
        public double Operand1 { get; set; }
        public double Operand2 { get; set; }
        public string Operator { get; set; }
    }

    public class CalculationResult
    {
        public double Result { get; set; }
    }

    public class CalculatorService
    {
        public CalculationResult Calculate(CalculationRequest request)
        {
            double result;

            switch (request.Operator)
            {
                case "+":
                    result = request.Operand1 + request.Operand2;
                    break;
                case "-":
                    result = request.Operand1 - request.Operand2;
                    break;
                case "*":
                    result = request.Operand1 * request.Operand2;
                    break;
                case "/":
                    if (request.Operand2 == 0)
                    {
                        throw new DivideByZeroException();
                    }
                    result = request.Operand1 / request.Operand2;
                    break;
                default:
                    throw new InvalidOperationException("Invalid operator.");
            }

            return new CalculationResult { Result = result };
        }
    }
}