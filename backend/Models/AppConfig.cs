package Models;

using System;
using System.ComponentModel.DataAnnotations;

public class AppConfig
{
    [Required]
    [Url]
    public string ApiEndpoint { get; set; }

    [Required]
    public string DatabaseConnectionString { get; set; }

    [Required]
    public string AuthToken { get; set; }

    public bool FeatureFlag { get; set; }

    public int MaxRetryAttempts { get; set; }

    public AppConfig(string apiEndpoint, string databaseConnectionString, string authToken, bool featureFlag, int maxRetryAttempts)
    {
        ApiEndpoint = apiEndpoint;
        DatabaseConnectionString = databaseConnectionString;
        AuthToken = authToken;
        FeatureFlag = featureFlag;
        MaxRetryAttempts = maxRetryAttempts;
    }

    public void Validate()
    {
        var validationContext = new ValidationContext(this);
        Validator.ValidateObject(this, validationContext, validateAllProperties: true);
    }
}