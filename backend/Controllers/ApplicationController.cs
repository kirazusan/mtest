using Microsoft.AspNetCore.Mvc;
using YourNamespace.Services;
using YourNamespace.Models;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationService _applicationService;

        public ApplicationController(ApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        public class CreateApplicationRequest
        {
            [Required]
            public string Name { get; set; }
            [Required]
            public string Description { get; set; }
        }

        [HttpPost]
        [Route("create")]
        public ActionResult<ApplicationModel> CreateApplication([FromBody] CreateApplicationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var application = _applicationService.CreateApplication(request.Name, request.Description);
                return Ok(application);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}