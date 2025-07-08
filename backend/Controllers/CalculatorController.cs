package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

public class CalculatorRequest
{
    public double Value1 { get; set; }
    public double Value2 { get; set; }
    public string MathOperator { get; set; }
}

public class CalculationResponse
{
    public double? Result { get; set; }
    public string ErrorMessage { get; set; }
}

public class CalculatorController : ControllerBase
{
    private readonly CalculatorService _calculatorService;
    private static readonly string[] AllowedOperators = { "+", "-", "*", "/" };

    public CalculatorController(CalculatorService calculatorService)
    {
        _calculatorService = calculatorService;
    }

    [HttpPost("api/calculator/calculate")]
    public async Task<IActionResult> PerformCalculation([FromBody] CalculatorRequest request)
    {
        if (!ValidateInput(request, out var errorMessage))
        {
            return BadRequest(new CalculationResponse { ErrorMessage = errorMessage });
        }

        try
        {
            if (request.MathOperator == "/" && request.Value2 == 0)
            {
                return BadRequest(new CalculationResponse { ErrorMessage = "Division by zero is not allowed." });
            }

            var result = await _calculatorService.CalculateAsync(request.Value1, request.Value2, request.MathOperator);
            return Ok(new CalculationResponse { Result = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new CalculationResponse { ErrorMessage = ex.Message });
        }
    }

    [HttpPost("api/calculator/run")]
    public async Task<IActionResult> Run([FromBody] CalculatorRequest request)
    {
        if (!ValidateInput(request, out var errorMessage))
        {
            return BadRequest(new CalculationResponse { ErrorMessage = errorMessage });
        }

        try
        {
            await _calculatorService.InitializeAsync();
            return Ok(new { Message = "Calculator initialized successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { ErrorMessage = ex.Message });
        }
    }

    [HttpPost("api/calculator/reset")]
    public IActionResult Reset()
    {
        try
        {
            _calculatorService.Reset();
            return Ok(new { Message = "Calculator state has been reset." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { ErrorMessage = ex.Message });
        }
    }

    private bool ValidateInput(CalculatorRequest request, out string errorMessage)
    {
        errorMessage = null;
        if (double.TryParse(request.Value1.ToString(), out _) && double.TryParse(request.Value2.ToString(), out _))
        {
            if (Array.Exists(AllowedOperators, op => op == request.MathOperator))
            {
                return true;
            }
            errorMessage = "Invalid math operator.";
        }
        else
        {
            errorMessage = "Invalid input values.";
        }
        return false;
    }
}