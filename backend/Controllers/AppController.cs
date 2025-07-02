package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("api/[controller]")]
public class AppController : ControllerBase
{
    private readonly IAppService _appService;

    public AppController(IAppService appService)
    {
        _appService = appService;
    }

    [HttpPost("init")]
    public IActionResult InitializeApp()
    {
        try
        {
            _appService.Initialize();
            return Ok(new { message = "Application initialized successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("add")]
    public IActionResult Add(double a, double b)
    {
        return Ok(new { result = a + b });
    }

    [HttpGet("subtract")]
    public IActionResult Subtract(double a, double b)
    {
        return Ok(new { result = a - b });
    }

    [HttpGet("multiply")]
    public IActionResult Multiply(double a, double b)
    {
        return Ok(new { result = a * b });
    }

    [HttpGet("divide")]
    public IActionResult Divide(double a, double b)
    {
        if (b == 0)
        {
            return BadRequest(new { error = "Division by zero is not allowed." });
        }
        return Ok(new { result = a / b });
    }
}