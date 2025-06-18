

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ButtonController : ControllerBase
    {
        private readonly string _connectionString = "Server=tcp:localhost,1433;Database=ButtonValues;User ID=sa;Password=P@ssw0rd;";

        [HttpGet]
        public async Task<IActionResult> GetButtonValue(string buttonValue)
        {
            if (string.IsNullOrEmpty(buttonValue))
            {
                return BadRequest("Button value is required");
            }

            try
            {
                var retrievedValue = await RetrieveButtonValueFromDatabase(buttonValue);
                return Json(retrievedValue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private async Task<string> RetrieveButtonValueFromDatabase(string buttonValue)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT ButtonValue FROM ButtonValues WHERE ButtonName = @ButtonName", connection);
                command.Parameters.AddWithValue("@ButtonName", buttonValue);

                var result = await command.ExecuteScalarAsync();
                return result?.ToString();
            }
        }
    }
}