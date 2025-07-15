package Models;

using System.ComponentModel.DataAnnotations;

public class CalculationRequest
{
    [Required]
    [Range(double.MinValue, double.MaxValue)]
    public double FirstNumber { get; set; }

    [Required]
    [Range(double.MinValue, double.MaxValue)]
    public double SecondNumber { get; set; }

    [Required]
    [RegularExpression(@"^[+\-*/]$", ErrorMessage = "Operator must be one of +, -, *, /")]
    public string Operator { get; set; }
}