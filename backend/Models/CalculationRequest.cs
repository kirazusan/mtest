package backend.Models;

using System.ComponentModel.DataAnnotations;

public class CalculationRequest
{
    [Required]
    public double Number1 { get; set; }

    [Required]
    public double Number2 { get; set; }

    [Required]
    [StringLength(10)]
    [RegularExpression("^(add|subtract|multiply|divide)$", ErrorMessage = "Invalid operation.")]
    public string Operation { get; set; }
}