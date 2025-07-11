package Models;

using System.ComponentModel.DataAnnotations;

public enum OperationType
{
    Addition,
    Subtraction,
    Multiplication,
    Division
}

public class CalculationRequest
{
    [Required]
    [Range(-1000000, 1000000)]
    public double Operand1 { get; set; }

    [Required]
    [Range(-1000000, 1000000)]
    public double Operand2 { get; set; }

    [Required]
    public OperationType Operation { get; set; }
}