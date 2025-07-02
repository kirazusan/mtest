package backend.Models;

using System.ComponentModel.DataAnnotations;

public class MauiAppModel
{
    [Required]
    public string ConfigurationSettings { get; set; }

    public bool InitializationStatus { get; set; }

    public bool Success { get; set; }

    public object Data { get; set; }

    [StringLength(500)]
    public string ErrorMessage { get; set; }
}