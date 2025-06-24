

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace backend
{
    public class CalculatorController : Controller
    {
        private readonly CalculatorService _calculatorService;
        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(CalculatorService calculatorService, ILogger<CalculatorController> logger)
        {
            _calculatorService = calculatorService;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult OnSelectOperator(string operatorValue, string resultText)
        {
            if (string.IsNullOrEmpty(operatorValue) || string.IsNullOrEmpty(resultText))
            {
                _logger.LogError("Invalid input parameters");
                return BadRequest("Invalid input parameters");
            }

            try
            {
                _calculatorService.LockNumberValue(resultText);
                var result = _calculatorService.PerformCalculation(operatorValue, resultText);
                return Json(new { result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during calculation");
                return StatusCode(500, "Error occurred during calculation");
            }
        }
    }
}
```