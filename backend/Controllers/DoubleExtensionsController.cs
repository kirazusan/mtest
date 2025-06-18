

```csharp
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    /// <summary>
    /// API controller for double extensions.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DoubleExtensionsController : ControllerBase
    {
        private readonly DoubleExtensionsService _doubleExtensionsService;

        /// <summary>
        /// Initializes a new instance of the <see cref="DoubleExtensionsController"/> class.
        /// </summary>
        /// <param name="doubleExtensionsService">The double extensions service.</param>
        public DoubleExtensionsController(DoubleExtensionsService doubleExtensionsService)
        {
            _doubleExtensionsService = doubleExtensionsService;
        }

        /// <summary>
        /// Converts a double value to a trimmed string.
        /// </summary>
        /// <param name="target">The double value to convert.</param>
        /// <param name="decimalFormat">The decimal format string.</param>
        /// <returns>A JSON object containing the trimmed string.</returns>
        [HttpPost("ToTrimmedString")]
        public IActionResult ToTrimmedString([FromBody]DoubleExtensionsModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest("Model is null");
                }

                if (string.IsNullOrEmpty(model.DecimalFormat))
                {
                    return BadRequest("Decimal format is null or empty");
                }

                var result = _doubleExtensionsService.ToTrimmedString(model.Target, model.DecimalFormat);
                return Ok(new { trimmedString = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

    /// <summary>
    /// Model for double extensions.
    /// </summary>
    public class DoubleExtensionsModel
    {
        /// <summary>
        /// Gets or sets the target double value.
        /// </summary>
        public double Target { get; set; }

        /// <summary>
        /// Gets or sets the decimal format string.
        /// </summary>
        public string DecimalFormat { get; set; }
    }
}
```