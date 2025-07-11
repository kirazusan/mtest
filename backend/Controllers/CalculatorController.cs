using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;

        public CalculatorController(CalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
        {
            try
            {
                var result = await _calculatorService.PerformCalculationAsync(request);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("gettrimmedstring")]
        public IActionResult GetTrimmedString([FromQuery] CalculationRequest request)
        {
            try
            {
                var trimmedString = DoubleExtensions.ToTrimmedString(request.Value, request.Format);
                return Ok(trimmedString);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

    public class CalculationRequest
    {
        public double Value { get; set; }
        public string Format { get; set; }
    }

    public class CalculatorService
    {
        public Task<double> PerformCalculationAsync(CalculationRequest request)
        {
            // Implementation of calculation logic
        }
    }

    public static class DoubleExtensions
    {
        public static string ToTrimmedString(double value, string format)
        {
            // Implementation of trimming logic
        }
    }
