

```csharp
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend
{
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;

        public CalculatorController(CalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        public IActionResult OnSelectOperator(string @operator, object sender, EventArgs e)
        {
            try
            {
                if (string.IsNullOrEmpty(@operator))
                {
                    return BadRequest("Operator is required");
                }

                var result = _calculatorService.OnSelectOperator(@operator, sender, e);
                if (result == null)
                {
                    return NotFound("Result not found");
                }

                return Ok(new { CurrentState = result.CurrentState, MathOperator = result.MathOperator });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
```