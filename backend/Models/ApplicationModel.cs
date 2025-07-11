package backend.Models;

public class ApplicationModel {
    public bool IsInitialized { get; set; }
    public string Version { get; set; }
    public string Environment { get; set; }
    public string DatabaseConnectionString { get; set; }
    public int MaxConnections { get; set; }

    public ApplicationModel() {
        IsInitialized = false;
        Version = "1.0.0";
        Environment = "Development";
        DatabaseConnectionString = string.Empty;
        MaxConnections = 100;
    }
}