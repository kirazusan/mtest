package backend.Services;

using System;

public class AppService
{
    public ApplicationConfiguration CreateApp()
    {
        var config = new ApplicationConfiguration();
        config.LoadSettings();
        config.InitializeServices();
        return config;
    }
}

public class ApplicationConfiguration
{
    public void LoadSettings()
    {
    }

    public void InitializeServices()
    {
    }
}