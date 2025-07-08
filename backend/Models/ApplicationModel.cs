package backend.Models;

using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

public class ApplicationModel
{
    private string applicationName;
    private string version;

    public string ApplicationName
    {
        get => applicationName;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("ApplicationName cannot be null or empty.");
            applicationName = value;
        }
    }

    public string Version
    {
        get => version;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Version cannot be null or empty.");
            version = value;
        }
    }

    public Dictionary<string, string> ConfigurationSettings { get; set; }

    public ApplicationModel()
    {
        ConfigurationSettings = new Dictionary<string, string>();
    }

    public string Serialize()
    {
        try
        {
            return JsonSerializer.Serialize(this);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Serialization failed.", ex);
        }
    }

    public static ApplicationModel Deserialize(string jsonString)
    {
        try
        {
            return JsonSerializer.Deserialize<ApplicationModel>(jsonString);
        }
        catch (JsonException ex)
        {
            throw new InvalidOperationException("Deserialization failed.", ex);
        }
    }
}