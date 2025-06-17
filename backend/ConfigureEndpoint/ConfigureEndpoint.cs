

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ConfigureEndpoint
{
    public class ConfigureEndpoint
    {
        private readonly ILogger _logger;

        public ConfigureEndpoint(ILogger<ConfigureEndpoint> logger)
        {
            _logger = logger;
        }

        public void Configure(IApplicationBuilder app)
        {
            app.Run(async (HttpContext context) =>
            {
                try
                {
                    await context.Response.WriteAsync("Hello World!");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while writing to the response stream.");
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("An error occurred while processing your request.");
                }
            });
        }
    }
}