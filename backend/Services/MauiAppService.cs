package backend.Services;

using System;
using System.IO;
using Microsoft.Extensions.Configuration;

public class MauiAppModel
{
    public bool Success { get; set; }
    public string Message { get; set; }
}

public class MauiAppService
{
    private readonly IConfiguration _configuration;

    public MauiAppService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public MauiAppModel CreateMauiApp()
    {
        var result = new MauiAppModel();

        try
        {
            LoadConfigurationSettings();
            PrepareResources();
            result.Success = true;
            result.Message = "Maui application initialized successfully.";
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Message = $"Error initializing Maui application: {ex.Message}";
        }

        return result;
    }

    private void LoadConfigurationSettings()
    {
        var setting = _configuration["AppSetting"];
        if (string.IsNullOrEmpty(setting))
        {
            throw new Exception("Configuration setting is missing.");
        }
    }

    private void PrepareResources()
    {
        if (!Directory.Exists("Resources"))
        {
            throw new Exception("Required resources directory is missing.");
        }
    }
}