

using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace Controllers
{
    public class MathOperatorController : ControllerBase
    {
        private readonly ReaderWriterLockSlim _lock = new ReaderWriterLockSlim();
        private string _currentOperator;

        public MathOperatorController()
        {
            _currentOperator = "";
        }

        [HttpPut]
        public IActionResult UpdateMathOperator(string operatorValue)
        {
            try
            {
                if (string.IsNullOrEmpty(operatorValue))
                {
                    return BadRequest("Operator value cannot be null or empty");
                }

                if (!IsValidOperator(operatorValue))
                {
                    return BadRequest("Invalid operator value");
                }

                _lock.EnterWriteLock();
                try
                {
                    _currentOperator = operatorValue;
                }
                finally
                {
                    _lock.ExitWriteLock();
                }

                return Ok(_currentOperator);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private bool IsValidOperator(string operatorValue)
        {
            return operatorValue == "+" || operatorValue == "-" || operatorValue == "*" || operatorValue == "/";
        }
    }
}