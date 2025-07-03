package Models;

using System.ComponentModel.DataAnnotations;

public class MauiAppModel
{
    [Required]
    [StringLength(100)]
    public string AppName { get; set; }

    [Required]
    [StringLength(10)]
    public string Version { get; set; }

    [Required]
    [StringLength(500)]
    public string Description { get; set; }

    public MauiAppModel(string appName, string version, string description)
    {
        AppName = appName;
        Version = version;
        Description = description;
    }
}