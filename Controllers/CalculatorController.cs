

using Microsoft.AspNetCore.Mvc;
using System;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;
        private readonly CalculatorModel _calculatorModel;

        public CalculatorController(CalculatorService calculatorService, CalculatorModel calculatorModel)
        {
            _calculatorService = calculatorService;
            _calculatorModel = calculatorModel;
        }

        [HttpPost("clear")]
        public IActionResult Clear()
        {
            _calculatorModel.Clear();
            return Ok(new { success = true });
        }

        [HttpPost("calculate")]
        public IActionResult Calculate()
        {
            if (!_calculatorModel.IsReadyForCalculation())
            {
                return BadRequest("Calculation state is not ready");
            }

            var result = _calculatorModel.Calculate();
            return Ok(new { result = result);
        }

        [HttpPost("lock-number-value")]
        public IActionResult LockNumberValue(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return BadRequest("Input string is empty");
            }

            try
            {
                var number = _calculatorService.ParseNumber(text);

                if (_calculatorModel.FirstNumber == null)
                {
                    _calculatorModel.FirstNumber = number;
                }
                else
                {
                    _calculatorModel.SecondNumber = number;
                }
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to parse input string: {ex.Message}");
            }
        }
    }
}