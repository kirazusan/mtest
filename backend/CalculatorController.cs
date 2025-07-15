package backend;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;

public class CalculatorController : ControllerBase
{
    [HttpPost("api/calculate/trimmed")]
    public IActionResult CalculateTrimmed([FromBody] CalculationRequest request)
    {
        if (request == null || !request.Value.HasValue || string.IsNullOrEmpty(request.Format))
        {
            return BadRequest("Invalid request.");
        }

        var result = request.Value.Value.ToTrimmedString(request.Format);
        return Ok(new { Result = result });
    }
}

public class CalculationRequest
{
    public double? Value { get; set; }
    public string Format { get; set; }
}

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double value, string format)
    {
        return value.ToString(format).TrimEnd('0').TrimEnd('.');
    }
}