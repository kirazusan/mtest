using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api")]
    public class NegateNumberController : ControllerBase
    {
        private readonly NegateNumberService _negateNumberService;

        public NegateNumberController(NegateNumberService negateNumberService)
        {
            _negateNumberService = negateNumberService;
        }

        [HttpPost("negate")]
        public ActionResult<NegateNumberResponse> Negate([FromBody] NegateNumberRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input. Please provide a valid number.");
            }

            try
            {
                var negatedNumber = _negateNumberService.Negate(request.Number);
                return Ok(new NegateNumberResponse { NegatedNumber = negatedNumber });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    public class NegateNumberRequest
    {
        [Required]
        public double Number { get; set; }
    }

    public class NegateNumberResponse
    {
        public double NegatedNumber { get; set; }
    }

    public class NegateNumberService
    {
        public double Negate(double number)
        {
            return -number;
        }
    }
}