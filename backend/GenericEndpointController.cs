

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Threading.Tasks;
using backend.Services;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using System.IO;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenericEndpointController : ControllerBase
    {
        private readonly ILogger<GenericEndpointController> _logger;
        private readonly IService _service;

        public GenericEndpointController(ILogger<GenericEndpointController> logger, IService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _service.GetData();
                _logger.LogInformation($"Get request successful. Response: {JsonConvert.SerializeObject(result)}");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting data");
                return StatusCode((int)HttpStatusCode.InternalServerError, "Error occurred while getting data");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]object data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid model state");
                    return BadRequest("Invalid model state");
                }
                await _service.SaveData(data);
                _logger.LogInformation($"Post request successful. Request: {JsonConvert.SerializeObject(data)}");
                return Ok("Data saved successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while saving data");
                return StatusCode((int)HttpStatusCode.InternalServerError, "Error occurred while saving data");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteData(id);
                _logger.LogInformation($"Delete request successful. Id: {id}");
                return Ok("Data deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting data");
                return StatusCode((int)HttpStatusCode.InternalServerError, "Error occurred while deleting data");
            }
        }
    }
}