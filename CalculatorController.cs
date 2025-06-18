

using Microsoft.AspNetCore.Mvc;
using System;

namespace CalculatorApi.Controllers
{
    [ApiController]
    [Route("api/calculate")]
    public class CalculatorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Calculate([FromQuery]double num1, [FromQuery]double num2, [FromQuery]string operation)
        {
            try
            {
                if (double.IsNaN(num1) || double.IsNaN(num2))
                {
                    return BadRequest("Invalid input");
                }

                if (operation != "+" && operation != "-" && operation != "*" && operation != "/")
                {
                    return BadRequest("Invalid operation");
                }

                double result = 0;
                switch (operation)
                {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        if (num2 != 0)
                            result = num1 / num2;
                        else
                            return BadRequest("Cannot divide by zero");
                        break;
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}