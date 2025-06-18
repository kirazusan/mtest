

using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private string currentState = "";
        private string mathOperator = "";
        private string currentNumber = "";
        private string firstNumber = "";
        private string secondNumber = "";

        [HttpPost("OnSelectOperator")]
        public IActionResult OnSelectOperator(string buttonValue)
        {
            if (string.IsNullOrEmpty(buttonValue))
            {
                return BadRequest("Button value cannot be null or empty");
            }

            LockNumberValue();
            currentState = "-2";
            mathOperator = buttonValue;
            UpdateMathOperator();
            return Ok();
        }

        private void LockNumberValue()
        {
            if (!string.IsNullOrEmpty(currentNumber))
            {
                if (string.IsNullOrEmpty(firstNumber))
                {
                    firstNumber = currentNumber;
                }
                else
                {
                    secondNumber = currentNumber;
                }
                currentNumber = "";
            }
        }

        private void UpdateMathOperator()
        {
            // implement logic to update the math operator
        }

        [HttpPost("Calculate")]
        public IActionResult Calculate()
        {
            if (string.IsNullOrEmpty(firstNumber) || string.IsNullOrEmpty(secondNumber) || string.IsNullOrEmpty(mathOperator))
            {
                return BadRequest("Invalid input parameters");
            }

            double result = 0;
            switch (mathOperator)
            {
                case "+":
                    result = Convert.ToDouble(firstNumber) + Convert.ToDouble(secondNumber);
                    break;
                case "-":
                    result = Convert.ToDouble(firstNumber) - Convert.ToDouble(secondNumber);
                    break;
                case "*":
                    result = Convert.ToDouble(firstNumber) * Convert.ToDouble(secondNumber);
                    break;
                case "/":
                    if (Convert.ToDouble(secondNumber) != 0)
                    {
                        result = Convert.ToDouble(firstNumber) / Convert.ToDouble(secondNumber);
                    }
                    else
                    {
                        return BadRequest("Cannot divide by zero");
                    }
                    break;
                default:
                    return BadRequest("Invalid math operator");
            }

            return Ok(result.ToString());
        }
    }
}