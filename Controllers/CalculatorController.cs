

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CalculatorService;
using CalculatorModel;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly ICalculatorService _calculatorService;
        private readonly ICalculatorModel _calculatorModel;

        public CalculatorController(ICalculatorService calculatorService, ICalculatorModel calculatorModel)
        {
            _calculatorService = calculatorService;
            _calculatorModel = calculatorModel;
        }

        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] CalculationRequest request)
        {
            if (_calculatorModel.CurrentState != 2)
            {
                return BadRequest("Invalid calculator state");
            }

            var result = _calculatorService.Calculate(request);
            _calculatorModel.UpdateState(result);
            return Json(result);
        }

        [HttpPost("on-clear")]
        public IActionResult OnClear()
        {
            _calculatorModel.FirstNumber = 0;
            _calculatorModel.SecondNumber = 0;
            _calculatorModel.CurrentState = 1;
            _calculatorModel.DecimalFormat = "N0";
            _calculatorModel.CurrentEntry = string.Empty;
            return Ok();
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] CalculationRequest request)
        {
            var result = _calculatorService.Add(request);
            _calculatorModel.UpdateState(result);
            return Json(result);
        }

        [HttpPost("subtract")]
        public IActionResult Subtract([FromBody] CalculationRequest request)
        {
            var result = _calculatorService.Subtract(request);
            _calculatorModel.UpdateState(result);
            return Json(result);
        }

        [HttpPost("multiply")]
        public IActionResult Multiply([FromBody] CalculationRequest request)
        {
            var result = _calculatorService.Multiply(request);
            _calculatorModel.UpdateState(result);
            return Json(result);
        }

        [HttpPost("divide")]
        public IActionResult Divide([FromBody] CalculationRequest request)
        {
            var result = _calculatorService.Divide(request);
            _calculatorModel.UpdateState(result);
            return Json(result);
        }

        [HttpPost("reset-calculator-state")]
        public IActionResult ResetCalculatorState()
        {
            try
            {
                _calculatorService.ResetCalculatorState();
                _calculatorModel.Reset();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("lock-number-value")]
        public IActionResult LockNumberValue([FromBody] CalculationRequest request)
        {
            var result = _calculatorService.LockNumberValue(request);
            _calculatorModel.UpdateState(result);
            return Json(result);
        }
    }

    public class CalculationRequest
    {
        public double FirstNumber { get; set; }
        public double SecondNumber { get; set; }
        public string Operation { get; set; }
    }
}