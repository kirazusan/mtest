

using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrentStateController : ControllerBase
    {
        private int currentState = 0;

        [HttpPut]
        [Route("UpdateCurrentState")]
        public IActionResult UpdateCurrentState(int newState)
        {
            currentState = newState;
            return Ok();
        }
    }
}