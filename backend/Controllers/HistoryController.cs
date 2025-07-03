using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryService _historyService;

        public HistoryController(IHistoryService historyService)
        {
            _historyService = historyService;
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearHistory()
        {
            try
            {
                var result = await _historyService.ClearHistoryAsync();
                if (result)
                {
                    return Ok(new { message = "History cleared successfully." });
                }
                return BadRequest(new { message = "History is already empty." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while clearing history.", error = ex.Message });
            }
        }
    }
}