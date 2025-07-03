package Models;

using System;

public class CalculationHistory
{
    public int Id { get; set; }
    public decimal Operand1 { get; set; }
    public decimal Operand2 { get; set; }
    public string OperatorSymbol { get; set; }
    public decimal Result { get; set; }
    public DateTime Timestamp { get; set; }

    public CalculationHistory(int id, decimal operand1, decimal operand2, string operatorSymbol)
    {
        Id = id;
        Operand1 = operand1;
        Operand2 = operand2;
        OperatorSymbol = operatorSymbol;
        Timestamp = DateTime.Now;
        Result = PerformCalculation();
    }

    private decimal PerformCalculation()
    {
        return OperatorSymbol switch
        {
            "+" => Operand1 + Operand2,
            "-" => Operand1 - Operand2,
            "*" => Operand1 * Operand2,
            "/" => Operand2 != 0 ? Operand1 / Operand2 : throw new DivideByZeroException(),
            _ => throw new InvalidOperationException("Invalid operator")
        };
    }
}