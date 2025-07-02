package Models;

using System;
using System.ComponentModel.DataAnnotations;

public enum Operation
{
    Addition,
    Subtraction,
    Multiplication,
    Division
}

public class CalculationRequest
{
    [Required]
    public double Number1 { get; set; }

    [Required]
    public double Number2 { get; set; }

    [Required]
    [EnumDataType(typeof(Operation))]
    public Operation Operation { get; set; }
}