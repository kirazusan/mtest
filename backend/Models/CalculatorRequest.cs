package backend.Models;

using System.ComponentModel.DataAnnotations;

public class CalculatorRequest
{
    [Required]
    public double Value1 { get; set; }

    [Required]
    public double Value2 { get; set; }

    [Required]
    [StringLength(10)]
    public string MathOperator { get; set; }
}

public class RunRequest
{
    [Required]
    public string UserPreferences { get; set; }

    [Required]
    public string InitialValues { get; set; }
}