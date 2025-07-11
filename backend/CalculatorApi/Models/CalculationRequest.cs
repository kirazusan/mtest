package CalculatorApi.Models;

public class CalculationRequest
{
    public double Number1 { get; set; }
    public double Number2 { get; set; }
    public string Operation { get; set; }
    public double Value1 { get; set; }
    public double Value2 { get; set; }
    public string MathOperator { get; set; }
}