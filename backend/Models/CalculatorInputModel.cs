package backend.Models;

using System.ComponentModel.DataAnnotations;

public class CalculatorInputModel
{
    [Required]
    public double Number1 { get; set; }

    [Required]
    public double Number2 { get; set; }

    [Required]
    [RegularExpression(@"^[+\-*/]$", ErrorMessage = "Operator must be one of +, -, *, /")]
    public string Operator { get; set; }
}