

using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class HelloWorldController : ControllerBase
    {
        [HttpGet]
        public string GetHelloWorld()
        {
            return "Hello World!";
        }
    }
}