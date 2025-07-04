package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using backend.Services;
using backend.Models;

[ApiController]
[Route("api/calculator")]
public class CalculatorController : ControllerBase
{
    private readonly CalculatorService _calculatorService;

    public CalculatorController(CalculatorService calculatorService)
    {
        _calculatorService = calculatorService;
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] CalculationRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await _calculatorService.Add(request.Number1, request.Number2);
        return Ok(new { Result = result });
    }

    [HttpPost("subtract")]
    public async Task<IActionResult> Subtract([FromBody] CalculationRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await _calculatorService.Subtract(request.Number1, request.Number2);
        return Ok(new { Result = result });
    }

    [HttpPost("multiply")]
    public async Task<IActionResult> Multiply([FromBody] CalculationRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await _calculatorService.Multiply(request.Number1, request.Number2);
        return Ok(new { Result = result });
    }

    [HttpPost("divide")]
    public async Task<IActionResult> Divide([FromBody] CalculationRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (request.Number2 == 0) return BadRequest("Division by zero is not allowed.");
        var result = await _calculatorService.Divide(request.Number1, request.Number2);
        return Ok(new { Result = result });
    }

    [HttpPost("percentage")]
    public async Task<IActionResult> CalculatePercentage([FromBody] PercentageRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (request.Number == null || request.Percentage == null) return BadRequest("Both Number and Percentage must be provided.");
        var result = await _calculatorService.CalculatePercentage(request.Number, request.Percentage);
        return Ok(new PercentageResponse { Result = result });
    }

    [HttpPost("perform")]
    public async Task<IActionResult> PerformCalculation([FromBody] CalculationRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            if (request.Operation == "divide" && request.Number2 == 0) return BadRequest("Division by zero is not allowed.");
            var result = await _calculatorService.PerformCalculation(request.Operation, request.Number1, request.Number2);
            return Ok(new { Result = result });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("negate")]
    public async Task<IActionResult> NegateNumber([FromBody] NegateNumberRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (request.Number == null) return BadRequest("Number must be provided.");
        var result = await _calculatorService.NegateNumber(request.Number);
        return Ok(new NegateNumberResponse { Result = result });
    }
}