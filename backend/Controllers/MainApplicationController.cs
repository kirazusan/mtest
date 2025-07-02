package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using YourNamespace.Services;

[ApiController]
[Route("[controller]")]
public class MainApplicationController : ControllerBase
{
    private readonly MauiAppService _mauiAppService;

    public MainApplicationController(MauiAppService mauiAppService)
    {
        _mauiAppService = mauiAppService;
    }

    [HttpGet("CreateMauiApp")]
    public IActionResult CreateMauiApp()
    {
        _mauiAppService.Initialize();
        return Ok();
    }
}