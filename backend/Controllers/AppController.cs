package backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using YourNamespace.Services;

[ApiController]
[Route("[controller]")]
public class AppController : ControllerBase
{
    private readonly MauiAppService _mauiAppService;

    public AppController(MauiAppService mauiAppService)
    {
        _mauiAppService = mauiAppService;
    }

    [HttpGet("create")]
    public IActionResult CreateMauiApp()
    {
        var result = _mauiAppService.InitializeApp();
        return Ok(result);
    }
}