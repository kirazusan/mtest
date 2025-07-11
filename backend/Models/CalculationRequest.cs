package backend.Models;

using System.ComponentModel.DataAnnotations;

public class CalculationRequest
{
    private static readonly string[] ValidOperations = { "addition", "subtraction", "multiplication", "division" };

    [Required]
    public double Number1 { get; set; }

    [Required]
    public double Number2 { get; set; }

    [Required]
    [RegularExpression("addition|subtraction|multiplication|division", ErrorMessage = "Invalid operation. Valid operations are: addition, subtraction, multiplication, division.")]
    public string Operation { get; set; }

    [Required]
    public double value1 { get; set; }

    [Required]
    public double value2 { get; set; }

    [Required]
    [StringLength(1, ErrorMessage = "Math operator must be a single character.")]
    public string mathOperator { get; set; }
}