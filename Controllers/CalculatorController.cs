

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly ILogger<CalculatorController> _logger;
        private readonly CalculatorService _calculatorService;
        private readonly DbContext _dbContext;
        private double firstNumber;
        private double secondNumber;
        private char currentState;
        private string mathematicalOperator;
        private string currentCalculation;
        private string decimalFormat;

        public CalculatorController(ILogger<CalculatorController> logger, CalculatorService calculatorService, DbContext dbContext)
        {
            _logger = logger;
            _calculatorService = calculatorService;
            _dbContext = dbContext;
        }

        [HttpPost("LockNumberValue")]
        public IActionResult LockNumberValue([FromBody]double currentEntry)
        {
            try
            {
                double numberValue;
                if (double.TryParse(currentEntry.ToString(), out numberValue))
                {
                    if (currentState == 'initial')
                    {
                        firstNumber = numberValue;
                    }
                    else
                    {
                        secondNumber = numberValue;
                    }
                    currentEntry = 0;
                    return Ok(numberValue);
                }
                else
                {
                    return BadRequest("Invalid number value");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error locking number value");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("OnSelectNumber")]
        public IActionResult OnSelectNumber([FromBody]string buttonValue)
        {
            try
            {
                string result = _calculatorService.Calculate(buttonValue, firstNumber, secondNumber, currentState);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error selecting number");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetCalculatorState")]
        public IActionResult GetCalculatorState()
        {
            try
            {
                var state = new CalculatorState
                {
                    firstNumber = firstNumber,
                    secondNumber = secondNumber,
                    mathematicalOperator = mathematicalOperator,
                    currentCalculation = currentCalculation,
                    decimalFormat = decimalFormat
                };
                return Ok(state);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting calculator state");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("UpdateCalculatorState")]
        public IActionResult UpdateCalculatorState([FromBody]CalculatorState state)
        {
            try
            {
                firstNumber = state.firstNumber;
                secondNumber = state.secondNumber;
                mathematicalOperator = state.mathematicalOperator;
                currentCalculation = state.currentCalculation;
                decimalFormat = state.decimalFormat;
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating calculator state");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("ResetCalculatorState")]
        public IActionResult ResetCalculatorState()
        {
            try
            {
                firstNumber = 0;
                secondNumber = 0;
                currentState = 'initial';
                decimalFormat = "0.00";
                _calculatorService.ResetCalculatorState();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting calculator state");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("UpdateCurrentState")]
        public IActionResult UpdateCurrentState()
        {
            try
            {
                currentState = -2;
                _dbContext.Database.ExecuteSqlCommand("UpdateCurrentState @currentState", new SqlParameter("@currentState", currentState));
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating current state");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("SelectNumber")]
        public IActionResult SelectNumber([FromBody]string buttonValue)
        {
            try
            {
                if (buttonValue == "C")
                {
                    firstNumber = 0;
                    secondNumber = 0;
                    currentState = 'initial';
                    decimalFormat = "0.00";
                }
                else
                {
                    string result = _calculatorService.Calculate(buttonValue, firstNumber, secondNumber, currentState);
                    return Ok(result);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error selecting number");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }

    public class CalculatorState
    {
        public double firstNumber { get; set; }
        public double secondNumber { get; set; }
        public string mathematicalOperator { get; set; }
        public string currentCalculation { get; set; }
        public string decimalFormat { get; set; }
    }
}
```