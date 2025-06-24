

using Microsoft.AspNetCore.Mvc;
using System;

namespace backend
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculationController : ControllerBase
    {
        [HttpPost("ResetCalculationState")]
        public IActionResult ResetCalculationState()
        {
            try
            {
                if (HttpContext.Request.Method != "POST")
                {
                    return BadRequest("Invalid HTTP method");
                }

                var calculationState = new CalculationState { State = "Reset" };
                return Json(calculationState);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

    public class CalculationState
    {
        public string State { get; set; } = "Initial";
    }
}