package Models;

using System;
using System.Text.Json;

public class AppConfiguration
{
    public string ServiceUrl { get; set; }
    public string AnotherServiceUrl { get; set; }
    public bool FeatureFlag { get; set; }
    public bool AnotherFeatureFlag { get; set; }
    public int MaxRetries { get; set; }
    public string ApiKey { get; set; }

    public string ToJson()
    {
        return JsonSerializer.Serialize(this);
    }

    public static AppConfiguration FromJson(string json)
    {
        return JsonSerializer.Deserialize<AppConfiguration>(json);
    }
}