

using Microsoft.AspNetCore.Mvc;
using System;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MathOperatorController : ControllerBase
    {
        private string _mathOperator;

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put([Required] string mathOperator)
        {
            if (string.IsNullOrWhiteSpace(mathOperator))
            {
                return BadRequest("Math operator is required.");
            }

            _mathOperator = mathOperator;
            return Ok("Math operator updated successfully.");
        }
    }
}