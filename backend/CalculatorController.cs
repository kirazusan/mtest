using Microsoft.AspNetCore.Mvc;
using System;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        [HttpGet("add")]
        public ActionResult<double> Add(double a, double b)
        {
            return Ok(a + b);
        }

        [HttpGet("subtract")]
        public ActionResult<double> Subtract(double a, double b)
        {
            return Ok(a - b);
        }

        [HttpGet("multiply")]
        public ActionResult<double> Multiply(double a, double b)
        {
            return Ok(a * b);
        }

        [HttpGet("divide")]
        public ActionResult<double> Divide(double a, double b)
        {
            if (b == 0)
            {
                return BadRequest("Division by zero is not allowed.");
            }
            return Ok(a / b);
        }

        [HttpGet("power")]
        public ActionResult<double> Power(double a, double b)
        {
            return Ok(Math.Pow(a, b));
        }

        [HttpGet("sqrt")]
        public ActionResult<double> Sqrt(double a)
        {
            if (a < 0)
            {
                return BadRequest("Square root of a negative number is not allowed.");
            }
            return Ok(Math.Sqrt(a));
        }

        private bool IsValidNumber(double number)
        {
            return !double.IsNaN(number) && !double.IsInfinity(number);
        }

        private ActionResult ValidateInputs(double a, double b)
        {
            if (!IsValidNumber(a) || !IsValidNumber(b))
            {
                return BadRequest("Invalid input. Please provide valid numbers.");
            }
            return null;
        }
    }
}