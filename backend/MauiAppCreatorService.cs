

using Microsoft.Extensions.Logging;
using MauiApp1;

namespace MauiApp1.Services
{
    public class MauiAppCreatorService
    {
        private readonly ILogger _logger;

        public MauiAppCreatorService(ILogger<MauiAppCreatorService> logger)
        {
            _logger = logger;
        }

        public App CreateMauiApp()
        {
            try
            {
                _logger.LogInformation("Creating MAUI application instance");
                var app = new App();
                _logger.LogInformation("MAUI application instance created successfully");
                return app;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating MAUI application instance");
                HandleError(ex);
                return null;
            }
        }

        private void HandleError(Exception ex)
        {
            if (ex is InvalidOperationException)
            {
                _logger.LogError(ex, "Invalid operation exception occurred while creating MAUI application instance");
            }
            else if (ex is ArgumentNullException)
            {
                _logger.LogError(ex, "Argument null exception occurred while creating MAUI application instance");
            }
            else
            {
                _logger.LogError(ex, "An error occurred while creating MAUI application instance");
            }
        }
    }
}