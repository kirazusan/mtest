

using Microsoft.AspNetCore.Mvc;
using System;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConvertDoubleToTrimmedStringController : ControllerBase
    {
        private readonly ConvertDoubleToTrimmedStringService _convertDoubleToTrimmedStringService;

        public ConvertDoubleToTrimmedStringController(ConvertDoubleToTrimmedStringService convertDoubleToTrimmedStringService)
        {
            _convertDoubleToTrimmedStringService = convertDoubleToTrimmedStringService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult ConvertDoubleToTrimmedString([FromBody] double value)
        {
            try
            {
                if (double.IsNaN(value) || double.IsInfinity(value))
                {
                    return BadRequest("Invalid input value");
                }

                var result = _convertDoubleToTrimmedStringService.Convert(value);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}