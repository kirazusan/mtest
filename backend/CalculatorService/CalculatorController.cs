

```csharp
using System;
using System.Web.Mvc;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

namespace backend.CalculatorService
{
    public class CalculatorController : Controller
    {
        private readonly ICalculatorService _calculatorService;
        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(ICalculatorService calculatorService, ILogger<CalculatorController> logger)
        {
            _calculatorService = calculatorService;
            _logger = logger;
        }

        public ActionResult GetButtonText()
        {
            try
            {
                var buttonText = _calculatorService.GetButtonText();
                return Json(buttonText, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting button text");
                return StatusCode(500, "Internal Server Error");
            }
        }

        public string ToTrimmedString(double value, string format)
        {
            if (string.IsNullOrEmpty(format))
            {
                _logger.LogError("Invalid format string");
                return "Invalid format string";
            }

            if (double.IsNaN(value) || double.IsInfinity(value))
            {
                _logger.LogError("Invalid value");
                return "Invalid value";
            }

            try
            {
                return _calculatorService.ToTrimmedString(value, format);
            }
            catch (FormatException ex)
            {
                _logger.LogError(ex, "Error trimming string");
                return "Error trimming string";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error trimming string");
                return "Error trimming string";
            }
        }
    }
}
```