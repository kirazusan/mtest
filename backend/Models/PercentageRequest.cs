package Models;

using System.ComponentModel.DataAnnotations;

public class PercentageRequest
{
    [Required]
    [Range(0, double.MaxValue)]
    public decimal Number { get; set; }

    [Required]
    [Range(0, 100)]
    public decimal Percentage { get; set; }
}