using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramController : ControllerBase
    {
        private readonly IMauiAppService _mauiAppService;

        public ProgramController(IMauiAppService mauiAppService)
        {
            _mauiAppService = mauiAppService;
        }

        [HttpGet("initialize")]
        public IActionResult Initialize([FromQuery] string[] args)
        {
            if (args == null || args.Length == 0)
            {
                return BadRequest("Invalid command-line arguments.");
            }
            return Ok("Application has been initialized.");
        }

        [HttpPost("createMauiApp")]
        public IActionResult CreateMauiApp([FromBody] MauiAppRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.AppName))
            {
                return BadRequest("Invalid request data.");
            }
            var result = _mauiAppService.CreateMauiApp(request);
            if (result.IsSuccess)
            {
                return Ok(new { Message = "Maui app created successfully.", Data = result.AppData });
            }
            return BadRequest(new { Message = result.ErrorMessage });
        }
    }

    public interface IMauiAppService
    {
        MauiAppResult CreateMauiApp(MauiAppRequest request);
    }

    public class MauiAppRequest
    {
        public string AppName { get; set; }
        public string AppVersion { get; set; }
        public string[] Dependencies { get; set; }
    }

    public class MauiAppResult
    {
        public bool IsSuccess { get; set; }
        public object AppData { get; set; }
        public string ErrorMessage { get; set; }
    }
}