package Controllers;

using Microsoft.AspNetCore.Mvc;
using System;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        [HttpGet("CreateMauiApp")]
        public ActionResult<object> CreateMauiApp()
        {
            try
            {
                var configuration = new
                {
                    Setting1 = "Value1",
                    Setting2 = "Value2",
                    Services = new[]
                    {
                        new { Name = "Service1", Url = "http://service1.url" },
                        new { Name = "Service2", Url = "http://service2.url" }
                    }
                };

                return Ok(configuration);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "An error occurred while creating the Maui app.", Details = ex.Message });
            }
        }
    }
}