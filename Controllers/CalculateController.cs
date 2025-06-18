

using Microsoft.AspNetCore.Mvc;
using System;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculateController : ControllerBase
    {
        private readonly ICalculateService _calculateService;

        public CalculateController(ICalculateService calculateService)
        {
            _calculateService = calculateService;
        }

        [HttpPost]
        public IActionResult Calculate(double firstNumber, double secondNumber, string operation)
        {
            if (operation != "+" && operation != "-" && operation != "*" && operation != "/")
            {
                return BadRequest("Invalid operation");
            }

            try
            {
                var result = _calculateService.Calculate(firstNumber, secondNumber, operation);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}