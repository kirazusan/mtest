package backend.Models;

using System.ComponentModel.DataAnnotations;

public enum MathOperator
{
    Add,
    Subtract,
    Multiply,
    Divide
}

public class CalculationRequest
{
    [Required]
    public double Number1 { get; set; }

    [Required]
    public double Number2 { get; set; }

    [Required]
    public MathOperator Operator { get; set; }
}