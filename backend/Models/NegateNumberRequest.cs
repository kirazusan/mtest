package backend.Models;

using System.ComponentModel.DataAnnotations;

public class NegateNumberRequest
{
    [Required]
    [Range(double.MinValue, double.MaxValue)]
    public double number { get; set; }

    [Required]
    [Range(double.MinValue, double.MaxValue)]
    public double Number { get; set; }
}