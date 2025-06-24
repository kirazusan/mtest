

using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly ICalculatorService _calculatorService;
        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(ICalculatorService calculatorService, ILogger<CalculatorController> logger)
        {
            _calculatorService = calculatorService;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Calculate(double firstNumber, double secondNumber, string mathOperator)
        {
            try
            {
                var result = _calculatorService.Calculate(firstNumber, secondNumber, mathOperator);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating result");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}

using System;

namespace backend.services
{
    public interface ICalculatorService
    {
        double Calculate(double firstNumber, double secondNumber, string mathOperator);
    }

    public class CalculatorService : ICalculatorService
    {
        public double Calculate(double firstNumber, double secondNumber, string mathOperator)
        {
            if (string.IsNullOrEmpty(mathOperator))
            {
                throw new ArgumentException("Math operator is null or empty", nameof(mathOperator));
            }

            double result = 0;
            switch (mathOperator)
            {
                case "+":
                    result = firstNumber + secondNumber;
                    break;
                case "-":
                    result = firstNumber - secondNumber;
                    break;
                case "*":
                    result = firstNumber * secondNumber;
                    break;
                case "/":
                    if (secondNumber != 0)
                    {
                        result = firstNumber / secondNumber;
                    }
                    else
                    {
                        throw new DivideByZeroException("Cannot divide by zero");
                    }
                    break;
                default:
                    throw new ArgumentException("Invalid math operator", nameof(mathOperator));
            }

            if (double.IsInfinity(result) || double.IsNaN(result))
            {
                throw new OverflowException("Result is too large");
            }

            return result;
        }
    }
}