

```csharp
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;
        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(CalculatorService calculatorService, ILogger<CalculatorController> logger)
        {
            _calculatorService = calculatorService;
            _logger = logger;
        }

        [HttpPut("current-entry")]
        public IActionResult UpdateCurrentEntry([FromBody, Required] string entry)
        {
            try
            {
                _calculatorService.UpdateCurrentEntry(entry);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating current entry");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("result")]
        public IActionResult UpdateResult([FromBody, Required] string result)
        {
            try
            {
                _calculatorService.UpdateResult(result);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating result");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
```