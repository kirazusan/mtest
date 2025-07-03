package Calculator.Controllers;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Calculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculatorController : ControllerBase
    {
        private static List<CalculationHistory> _history = new List<CalculationHistory>();

        [HttpGet("history")]
        public IActionResult GetHistory()
        {
            var response = _history.Select(h => new 
            {
                h.Number1,
                h.Number2,
                h.Operator,
                h.Result,
                h.Timestamp
            }).ToList();

            return Ok(response);
        }

        public class CalculationHistory
        {
            public double Number1 { get; set; }
            public double Number2 { get; set; }
            public string Operator { get; set; }
            public double Result { get; set; }
            public DateTime Timestamp { get; set; }
        }
    }
}