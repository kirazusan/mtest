package backend.Models;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

public class ApplicationConfig
{
    [Required]
    public string ApplicationName { get; set; }

    [Required]
    public string Version { get; set; }

    public Dictionary<string, string> Settings { get; set; } = new Dictionary<string, string>();

    public List<string> Services { get; set; } = new List<string>();

    public string ToJson()
    {
        try
        {
            return JsonSerializer.Serialize(this);
        }
        catch (Exception)
        {
            return string.Empty;
        }
    }

    public void Validate()
    {
        var validationContext = new ValidationContext(this);
        Validator.ValidateObject(this, validationContext, validateAllProperties: true);
    }
}