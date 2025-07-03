package backend;

using Microsoft.AspNetCore.Mvc;

public class CalculatorController : ControllerBase
{
    private readonly IHistoryService _historyService;

    public CalculatorController(IHistoryService historyService)
    {
        _historyService = historyService ?? throw new ArgumentNullException(nameof(historyService));
    }

    [HttpDelete("clear-history")]
    public IActionResult ClearHistory()
    {
        try
        {
            var result = _historyService.ClearHistory();
            if (result)
            {
                return Ok(new { message = "History cleared successfully." });
            }
            return NotFound(new { message = "History is already empty." });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An error occurred while clearing history." });
        }
    }
}