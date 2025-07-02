using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MauiAppController : ControllerBase
    {
        private readonly IMauiAppService _mauiAppService;

        public MauiAppController(IMauiAppService mauiAppService)
        {
            _mauiAppService = mauiAppService;
        }

        [HttpGet("initialize")]
        public async Task<IActionResult> InitializeMauiApp()
        {
            try
            {
                var result = await _mauiAppService.InitializeAsync();
                return Ok(new { success = true, data = result });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { success = false, message = "Initialization parameters are missing.", details = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { success = false, message = "Initialization failed due to an invalid operation.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}