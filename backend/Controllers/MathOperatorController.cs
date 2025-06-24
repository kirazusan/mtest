

using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MathOperatorController : ControllerBase
    {
        private readonly string connectionString;
        private readonly ILogger<MathOperatorController> logger;

        public MathOperatorController(IConfiguration configuration, ILogger<MathOperatorController> logger)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
            this.logger = logger;
        }

        [HttpGet]
        public IActionResult GetMathOperator()
        {
            if (HttpContext.Request.Method != "GET")
            {
                return BadRequest("Invalid HTTP request method");
            }

            string mathOperator = string.Empty;

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string query = "SELECT TOP 1 math_operator FROM math_operators";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                mathOperator = reader["math_operator"].ToString();
                            }
                        }
                    }
                }

                if (string.IsNullOrEmpty(mathOperator))
                {
                    return NotFound("Math operator not found");
                }

                return new JsonResult(mathOperator);
            }
            catch (SqlException ex)
            {
                logger.LogError(ex, "Error retrieving math operator from database");
                return StatusCode(500, "Internal Server Error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error retrieving math operator");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}