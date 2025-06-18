

using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LockNumberValueController : ControllerBase
    {
        [HttpPost]
        public IActionResult LockNumberValue([FromBody]LockNumberValueRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request body is null or empty");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (request.CurrentState != "unlocked")
            {
                return BadRequest("Invalid current state");
            }

            if (request.FirstNumber == request.SecondNumber)
            {
                return BadRequest("First and second numbers cannot be the same");
            }

            var result = new LockNumberValueResponse
            {
                Result = "Number value locked successfully",
                LockedNumber = request.FirstNumber > request.SecondNumber ? request.FirstNumber : request.SecondNumber
            };

            return Ok(result);
        }
    }

    public class LockNumberValueRequest
    {
        [Required]
        public string CurrentState { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int FirstNumber { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int SecondNumber { get; set; }
    }

    public class LockNumberValueResponse
    {
        public string Result { get; set; }
        public int LockedNumber { get; set; }
    }
}